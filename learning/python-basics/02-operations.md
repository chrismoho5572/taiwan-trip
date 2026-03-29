# Python Basics - Lesson 2: Operations

## Math Operations

| Symbol | ความหมาย | Example |
|--------|----------|---------|
| `+` | บวก | `10 + 5 = 15` |
| `-` | ลบ | `10 - 5 = 5` |
| `*` | คูณ | `10 * 5 = 50` |
| `/` | หาร | `10 / 5 = 2.0` |
| `//` | หารแบบตัดเศษ | `10 // 3 = 3` |
| `%` | หารเอาเศษ | `10 % 3 = 1` |

## Example Code

```python
# ตั้งค่าเริ่มต้น
fuel_total = 10000
fuel_used = 3500

# คำนวณ
remaining = fuel_total - fuel_used

# แสดงผล
print(remaining)    # 6500
```

## Practice ✅ DONE

```python
fuel_total = 10000
fuel_used = 3500
remaining = fuel_total - fuel_used
```

## Combining Text + Numbers

ถ้าอยาก print ให้สวยงาม:

```python
print("น้ำมันที่เหลือ:", remaining)
# ผลลัพธ์: น้ำมันที่เหลือ: 6500
```

หรือใช้ f-string (แนะนำ):

```python
print(f"น้ำมันที่เหลือ: {remaining} ลิตร")
# ผลลัพธ์: น้ำมันที่เหลือ: 6500 ลิตร
```

---

Next: Lesson 3 - Conditions (if/else)
