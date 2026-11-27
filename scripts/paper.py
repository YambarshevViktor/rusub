#!/usr/bin/env python3
"""Предрасчёт палитр «бумаги» карточек из постеров (paper.json).

Тот же алгоритм, что и posterPalette() в script.js: даунскейл до 24px по
ширине, гистограмма оттенков, топ-3 самые большие цветные зоны с весами.
Карточка красится мягким градиентом сразу, не дожидаясь загрузки картинки
и canvas. Правила красоты (зеркально в JS):
- порог 5% от лучшей корзины — второстепенные цвета попадают в градиент;
- колпак доминанты 65% — градиент виден даже на почти одноцветных постерах;
- схлопнувшаяся в один оттенок тройка разводится тональными ступенями;
- ч/б постеры (ни одного цветного пикселя) — серый градиент из яркостных
  перцентилей с лёгким tint-оттенком среднего цвета постера.

Формат на постер: [[light1, light2, light3], [dark1, dark2, dark3], [w1, w2, w3]].

Запуск из корня проекта:  python3 scripts/paper.py
"""
import glob
import json
import os

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def rgb_hs(r, g, b):
    """Оттенок (0-359) + насыщенность (0-100) — та же математика, что hsOf()."""
    rr, gg, bb = r / 255, g / 255, b / 255
    mx = max(rr, gg, bb)
    mn = min(rr, gg, bb)
    light = (mx + mn) / 2
    d = mx - mn
    if d == 0:
        hue = 0
        sv = 0
    else:
        sv = d / (2 - mx - mn) if light > 0.5 else d / (mx + mn)
        if mx == rr:
            hue = ((gg - bb) / d) % 6
        elif mx == gg:
            hue = (bb - rr) / d + 2
        else:
            hue = (rr - gg) / d + 4
        hue *= 60
        if hue < 0:
            hue += 360
    return round(hue), round(min(0.7, max(0.45, sv * 1.1)) * 100)


def shape_weights(weights):
    # Колпак красоты: доминанта не шире 65%, остаток делят второй и третий.
    if weights[0] > 0.65:
        rest = weights[1] + weights[2]
        if rest > 0:
            weights = [
                0.65,
                round(0.35 * weights[1] / rest, 2),
                round(0.35 * weights[2] / rest, 2),
            ]
    return weights


def gray_palette(lums, avg):
    # Ч/б постер: серый градиент тени → света + tint среднего цвета.
    h, s = rgb_hs(*avg)
    t = min(25, s)
    n = len(lums)
    picks = [lums[min(n - 1, int(n * q))] for q in (0.15, 0.5, 0.85)]
    lights = [f"hsl({h} {t}% {80 + p * 16 // 255}%)" for p in picks]
    darks = [f"hsl({h} {t}% {12 + p * 20 // 255}%)" for p in picks]
    return [lights, darks, [0.34, 0.33, 0.33]]


def palette(path):
    im = Image.open(path).convert("RGB")
    s = 24
    w, h = im.size
    nh = max(1, round(s * h / w))
    small = im.resize((s, nh), Image.BILINEAR)
    px = small.load()
    bins = [{"n": 0, "r": 0, "g": 0, "b": 0} for _ in range(24)]
    lums = []
    sr = sg = sb = 0
    for y in range(nh):
        for x in range(s):
            r, g, b = px[x, y]
            mx = max(r, g, b)
            mn = min(r, g, b)
            lums.append((mx + mn) // 2)
            sr += r
            sg += g
            sb += b
            sat = mx - mn
            # Только насыщенность: серый/белый/чёрный отсекаются,
            # итоговая светлота всё равно фиксирована (90%/24%).
            if sat < 64:
                continue
            if mx == r:
                hue = ((g - b) / sat) % 6
            elif mx == g:
                hue = (b - r) / sat + 2
            else:
                hue = (r - g) / sat + 4
            hue *= 60
            if hue < 0:
                hue += 360
            bn = bins[min(23, int(hue // 15))]
            bn["n"] += 1
            bn["r"] += r
            bn["g"] += g
            bn["b"] += b
    scored = [(b["n"], b) for b in bins if b["n"]]
    if not scored:
        n = len(lums)
        return gray_palette(sorted(lums), (sr / n, sg / n, sb / n)), True
    # Ранжирование по площади: самая большая цветная зона побеждает.
    scored.sort(key=lambda t: -t[0])
    best = scored[0][0]
    top = [(cnt, b) for cnt, b in scored[:3] if cnt >= best * 0.05]
    while len(top) < 3:
        top.append(top[-1])
    total = sum(cnt for cnt, _ in top)
    weights = shape_weights([round(cnt / total, 2) for cnt, _ in top])
    if top[0][1] is top[1][1] is top[2][1]:
        # Один оттенок на весь постер: ступени по насыщенности/светлоте.
        h, st = rgb_hs(
            top[0][1]["r"] / top[0][1]["n"],
            top[0][1]["g"] / top[0][1]["n"],
            top[0][1]["b"] / top[0][1]["n"],
        )
        s2 = max(30, st - 12)
        s3 = max(30, st - 18)
        lights = [
            f"hsl({h} {st}% 90%)",
            f"hsl({h} {s2}% 85%)",
            f"hsl({h} {s3}% 80%)",
        ]
        darks = [
            f"hsl({h} {st}% 24%)",
            f"hsl({h} {st}% 29%)",
            f"hsl({h} {st}% 34%)",
        ]
        return [lights, darks, weights], False
    hs = [
        rgb_hs(b["r"] / b["n"], b["g"] / b["n"], b["b"] / b["n"])
        for _, b in top
    ]
    lights = [f"hsl({h} {st}% 90%)" for h, st in hs]
    darks = [f"hsl({h} {st}% 24%)" for h, st in hs]
    return [lights, darks, weights], False


def main():
    out = {}
    grays = 0
    files = sorted(glob.glob(os.path.join(ROOT, "posters", "*.jpg")))
    for f in files:
        pal, is_gray = palette(f)
        out[os.path.relpath(f, ROOT)] = pal
        grays += is_gray
    dest = os.path.join(ROOT, "paper.json")
    with open(dest, "w") as fh:
        json.dump(out, fh, separators=(",", ":"))
    print(f"{len(out)} palettes ({grays} grayscale), 0 missed")
    print(f"wrote {dest} ({os.path.getsize(dest) // 1024} KB)")


if __name__ == "__main__":
    main()
