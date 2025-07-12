// Символы
$plus = 43
$eq = 61

// Указатели
$A = 1
$plusPos = 3
$B = 5
$eqPos = 7
$C = 9

// Временные указатели
$temp1 = 11
$temp2 = 13
$temp3 = 15


// Ввод
{to: A},
{to: B},


/* Операции с числами (копирование перестановка сложение) */

// Копирование значения A в temp1 без обнуления (Нужно чтобы: *temp1==0 и *temp2==0)
{to: A} 
[
    {to: temp1}+
    {to: temp2}+
    {to: A}-
]
{to: temp2}
[
    {to: A}+
    {to: temp2}-
]

// Копирование значения B в temp2 без обнуления (Нужно чтобы: *temp2==0 и *temp3==0)
{to: B}
[
    {to: temp2}+
    {to: temp3}+
    {to: B}-
]
{to: temp3}
[
    {to: B}+
    {to: temp3}-
]

// Перенос значения из temp2 в temp1 (Нужно чтобы: *temp1==0)
{to: temp2}
[
    {to: temp1}+
    {to: temp2}-
]

// *С = *С plus *temp1
{to: temp1}
[
    {to: C}+
    {to: temp1}-
]


// Сохранение символов в память
{to: plusPos}+{times: plus}
{to: eqPos}+{times: eq}


// Вывод
{to: A}.
{to: plusPos}.
{to: B}.
{to: eqPos}.
{to: C}.