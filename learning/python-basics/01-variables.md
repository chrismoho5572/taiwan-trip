# Python Basics - Lesson 1: Variables

## What is a Variable?

Variable = กล่องที่ใส่ข้อมูล แล้วติดป้ายชื่อ

## Types of Data

| Type | ไทย | Example |
|------|-----|---------|
| String | ข้อความ | `ship_name = "MV Moss"` |
| Integer | เลขจำนวนเต็ม | `crew_count = 12` |
| Float | เลขทศนิยม | `fuel_left = 5000.5` |
| Boolean | ใช่/ไม่ใช่ | `is_sailing = True` |

## Example Code

```python
# ตั้งชื่อเรือ
ship_name = "MV Moss"

# นับลูกเรือ
crew_count = 12

# เช็คน้ำมัน
fuel_left = 5000.5

# เช็คสถานะ
is_sailing = True

# แสดงผล
print(ship_name)
print(crew_count)
```

## Practice ✅ DONE

```python
# ชื่อ
my_name = "Chris"

# อายุ
my_age = 25
```

## f-string (แทรก variable ในข้อความ)

```python
coin = "ETH"
price = 3000

print(f"ราคา {coin} : {price} USD")
# ราคา ETH : 3000 USD
```

**กฎ:**
- ขึ้นต้นด้วย `f` ก่อน quote
- ใส่ variable ใน `{}`
- Python จะแปลง `{variable}` เป็นค่าจริง

## Notes

- String ต้องมี `""` หรือ `''`
- Integer ไม่ต้องมีจุดทศนิยม
- Float มีจุดทศนิยม
- Boolean มีแค่ `True` หรือ `False` (ตัวใหญ่นำหน้า)

---

Next: Lesson 3 - Conditions (if/else)
