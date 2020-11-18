---
layout: post.njk
title: How many four-chord loops are there?
date: 2020-08-21
permalink: posts/{{ date.toISOString().split("T")[0].split("-").join("/") }}/{{
  page.fileSlug }}/
tags:
  - posts
---
How many possible combinations of four chords are there?

---

## Diatonic

1. Chords: I ii iii IV V vi (no viidim), sus and inversions are alterations
2. 6x5x4x3 = 360 (permutation), or 6x6x6x6 (BaseN)
3. Rotations: 360/4 = 90
4. CEGa = FACd, so 4x3x2x1/4 = 6, 90-6=84
5. So 84 total progressions

## Diatonic extended

All possible combinations.

1. 6x6x6x6 = 1296 (BaseN)
2. Considering rotations and transpositions: 266

## Chromatic

1. Chords: still M and m, all roots
2. 24*23*22*21 / 12 (transpose) / 4 (rotations) = 5313
3. Symmetrical progressions (CM  *F#M* ), add 13
4. So 5326 total progressions

## Chromatic extended

1. Chords: still M and m, but not duplicate roots
2. 12*11*10*9*  16 (cartesian product) / 12 (transposition) / 4 (rotations) = 3960
3. What about symmetrical progressions 3972