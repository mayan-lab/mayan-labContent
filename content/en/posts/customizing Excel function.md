---
title: "Customizing Excel Function"
date: 2020-04-04T13:43:38+08:00
draft: false
description: "develop Excel plug-in"
hideToc: false
enableToc: true
enableTocContent: false
author: zhaoqiu
authorEmoji: 👽
tags: 
- Excel
- molecular weight
- data formatting
---
## Basics

> Customizing functions by Excel VBA greatly facilitate processing data, and it help improve efficiency. Normally, Function of VBA is used to define some process(instead of Sub, which can't return values). Even xls files contain customizing function are opened at other computer has no this function, Excel remains results. 

### How to insert your customizing codes

> creating a new Excel sheet, then pressing `alt` + `F11`, click `Insert`, `Moulde`.


### Function example

``` VB.net
'Function name(parameter As type) As type(return)
Function Kelvin(temperature As Double) As Double
    Kelvin = temperature + 273.15
End Function
```


## Getting molecular weight

![getMoles](/images/posts/getmoles.gif)

{{< tabs part full >}}

{{< tab >}}

``` VB.net
Function GETMOLES(name)
    'author: zhaoqiu
    Dim Formula(124) As String
    Formula(0) = "SiO2"
    Formula(1) = "TiO2"
    Formula(2) = "Al2O3"
    ' ... ...
    Formula(122) = "NH3"
    Formula(123) = "NH4"
    Formula(124) = "NH4NO3"
    
    Dim MolecularWeight(124) As Double
    MolecularWeight(0) = 60.0843
    MolecularWeight(1) = 79.8988
    MolecularWeight(2) = 101.96128
    ' ... ...
    MolecularWeight(122) = 17.0304
    MolecularWeight(123) = 18.0383
    MolecularWeight(124) = 80.0432

    Dim oxideN As Long
    oxideN = UBound(Formula) - LBound(Formula) + 1
    Dim i As Long
    Dim result As Double
    result = -1
    For i = 0 To (oxideN - 1)
        If UCase(Trim(name)) = UCase(Formula(i)) Then
            result = MolecularWeight(i)
            Exit For
        Else
        End If
    Next
    If result = -1 Then
        GETMOLES = -1
    Else
        GETMOLES = result
    End If
End Function
```

{{< /tab >}}

{{< tab >}}

{{< expand "All codes" >}}

``` VB.net
Function GETMOLES(name)
    'author: zhaoqiu
    Dim Formula(124) As String
    Formula(0) = "SiO2"
    Formula(1) = "TiO2"
    Formula(2) = "Al2O3"
    Formula(3) = "Cr2O3"
    Formula(4) = "Fe2O3"
    Formula(5) = "FeO"
    Formula(6) = "MnO"
    Formula(7) = "MgO"
    Formula(8) = "CaO"
    Formula(9) = "Na2O"
    Formula(10) = "K2O"
    Formula(11) = "H2O"
    Formula(12) = "NiO"
    Formula(13) = "ZrO2"
    Formula(14) = "HfO2"
    Formula(15) = "H"
    Formula(16) = "He"
    Formula(17) = "Li"
    Formula(18) = "Be"
    Formula(19) = "B"
    Formula(20) = "C"
    Formula(21) = "N"
    Formula(22) = "O"
    Formula(23) = "F"
    Formula(24) = "Ne"
    Formula(25) = "Na"
    Formula(26) = "Mg"
    Formula(27) = "Al"
    Formula(28) = "Si"
    Formula(29) = "P"
    Formula(30) = "S"
    Formula(31) = "Cl"
    Formula(32) = "Ar"
    Formula(33) = "K"
    Formula(34) = "Ca"
    Formula(35) = "Sc"
    Formula(36) = "Ti"
    Formula(37) = "V"
    Formula(38) = "Cr"
    Formula(39) = "Mn"
    Formula(40) = "Fe"
    Formula(41) = "Co"
    Formula(42) = "Ni"
    Formula(43) = "Cu"
    Formula(44) = "Zn"
    Formula(45) = "Ga"
    Formula(46) = "Ge"
    Formula(47) = "As"
    Formula(48) = "Se"
    Formula(49) = "Br"
    Formula(50) = "Kr"
    Formula(51) = "Rb"
    Formula(52) = "Sr"
    Formula(53) = "Y"
    Formula(54) = "Zr"
    Formula(55) = "Nb"
    Formula(56) = "Mo"
    Formula(57) = "Tc"
    Formula(58) = "Ru"
    Formula(59) = "Rh"
    Formula(60) = "Pd"
    Formula(61) = "Ag"
    Formula(62) = "Cd"
    Formula(63) = "In"
    Formula(64) = "Sn"
    Formula(65) = "Sb"
    Formula(66) = "Te"
    Formula(67) = "I"
    Formula(68) = "Xe"
    Formula(69) = "Cs"
    Formula(70) = "Ba"
    Formula(71) = "La"
    Formula(72) = "Ce"
    Formula(73) = "Pr"
    Formula(74) = "Nd"
    Formula(75) = "Pm"
    Formula(76) = "Sm"
    Formula(77) = "Eu"
    Formula(78) = "Gd"
    Formula(79) = "Tb"
    Formula(80) = "Dy"
    Formula(81) = "Ho"
    Formula(82) = "Er"
    Formula(83) = "Tm"
    Formula(84) = "Yb"
    Formula(85) = "Lu"
    Formula(86) = "Hf"
    Formula(87) = "Ta"
    Formula(88) = "W"
    Formula(89) = "Re"
    Formula(90) = "Os"
    Formula(91) = "Ir"
    Formula(92) = "Pt"
    Formula(93) = "Au"
    Formula(94) = "Hg"
    Formula(95) = "Tl"
    Formula(96) = "Pb"
    Formula(97) = "Bi"
    Formula(98) = "Po"
    Formula(99) = "At"
    Formula(100) = "Rn"
    Formula(101) = "Fr"
    Formula(102) = "Ra"
    Formula(103) = "Ac"
    Formula(104) = "Th"
    Formula(105) = "Pa"
    Formula(106) = "U"
    Formula(107) = "Np"
    Formula(108) = "Pu"
    Formula(109) = "Am"
    Formula(110) = "Cm"
    Formula(111) = "Bk"
    Formula(112) = "Cf"
    Formula(113) = "Es"
    Formula(114) = "Fm"
    Formula(115) = "Md"
    Formula(116) = "No"
    Formula(117) = "SO3"
    Formula(118) = "P2O5"
    Formula(119) = "N2"
    Formula(120) = "CO2"
    Formula(121) = "CO"
    Formula(122) = "NH3"
    Formula(123) = "NH4"
    Formula(124) = "NH4NO3"
    ' molecular weight
    Dim MolecularWeight(124) As Double
    MolecularWeight(0) = 60.0843
    MolecularWeight(1) = 79.8988
    MolecularWeight(2) = 101.96128
    MolecularWeight(3) = 151.9902
    MolecularWeight(4) = 159.6922
    MolecularWeight(5) = 71.8464
    MolecularWeight(6) = 70.9374
    MolecularWeight(7) = 40.3044
    MolecularWeight(8) = 56.0794
    MolecularWeight(9) = 61.97894
    MolecularWeight(10) = 94.196
    MolecularWeight(11) = 18.0152
    MolecularWeight(12) = 74.6994
    MolecularWeight(13) = 123.218
    MolecularWeight(14) = 210.49
    MolecularWeight(15) = 1.0079
    MolecularWeight(16) = 4.0026
    MolecularWeight(17) = 6.941
    MolecularWeight(18) = 9.01218
    MolecularWeight(19) = 10.81
    MolecularWeight(20) = 12.011
    MolecularWeight(21) = 14.0067
    MolecularWeight(22) = 15.9994
    MolecularWeight(23) = 18.998403
    MolecularWeight(24) = 20.179
    MolecularWeight(25) = 22.98977
    MolecularWeight(26) = 24.305
    MolecularWeight(27) = 26.98154
    MolecularWeight(28) = 28.0855
    MolecularWeight(29) = 30.97376
    MolecularWeight(30) = 32.06
    MolecularWeight(31) = 35.453
    MolecularWeight(32) = 39.948
    MolecularWeight(33) = 39.0983
    MolecularWeight(34) = 40.08
    MolecularWeight(35) = 44.9559
    MolecularWeight(36) = 47.9
    MolecularWeight(37) = 50.9415
    MolecularWeight(38) = 51.996
    MolecularWeight(39) = 54.938
    MolecularWeight(40) = 55.847
    MolecularWeight(41) = 58.9332
    MolecularWeight(42) = 58.7
    MolecularWeight(43) = 63.546
    MolecularWeight(44) = 65.38
    MolecularWeight(45) = 69.72
    MolecularWeight(46) = 72.59
    MolecularWeight(47) = 74.9216
    MolecularWeight(48) = 78.96
    MolecularWeight(49) = 79.904
    MolecularWeight(50) = 83.8
    MolecularWeight(51) = 85.4678
    MolecularWeight(52) = 87.62
    MolecularWeight(53) = 88.9059
    MolecularWeight(54) = 91.22
    MolecularWeight(55) = 92.9064
    MolecularWeight(56) = 95.94
    MolecularWeight(57) = 98
    MolecularWeight(58) = 101.07
    MolecularWeight(59) = 102.9055
    MolecularWeight(60) = 106.4
    MolecularWeight(61) = 107.868
    MolecularWeight(62) = 112.41
    MolecularWeight(63) = 114.82
    MolecularWeight(64) = 118.69
    MolecularWeight(65) = 121.75
    MolecularWeight(66) = 127.6
    MolecularWeight(67) = 126.9045
    MolecularWeight(68) = 131.3
    MolecularWeight(69) = 132.9054
    MolecularWeight(70) = 137.33
    MolecularWeight(71) = 138.9055
    MolecularWeight(72) = 140.12
    MolecularWeight(73) = 140.9077
    MolecularWeight(74) = 144.24
    MolecularWeight(75) = 145
    MolecularWeight(76) = 150.4
    MolecularWeight(77) = 151.96
    MolecularWeight(78) = 157.25
    MolecularWeight(79) = 158.9254
    MolecularWeight(80) = 162.5
    MolecularWeight(81) = 164.9304
    MolecularWeight(82) = 167.26
    MolecularWeight(83) = 168.9342
    MolecularWeight(84) = 173.04
    MolecularWeight(85) = 174.967
    MolecularWeight(86) = 178.49
    MolecularWeight(87) = 180.9479
    MolecularWeight(88) = 183.85
    MolecularWeight(89) = 186.207
    MolecularWeight(90) = 190.2
    MolecularWeight(91) = 192.22
    MolecularWeight(92) = 195.09
    MolecularWeight(93) = 196.9665
    MolecularWeight(94) = 200.59
    MolecularWeight(95) = 204.37
    MolecularWeight(96) = 207.2
    MolecularWeight(97) = 208.9804
    MolecularWeight(98) = 209
    MolecularWeight(99) = 210
    MolecularWeight(100) = 222
    MolecularWeight(101) = 223
    MolecularWeight(102) = 226.0254
    MolecularWeight(103) = 227.0278
    MolecularWeight(104) = 232.0381
    MolecularWeight(105) = 231.0359
    MolecularWeight(106) = 238.029
    MolecularWeight(107) = 237.0482
    MolecularWeight(108) = 244
    MolecularWeight(109) = 243
    MolecularWeight(110) = 247
    MolecularWeight(111) = 247
    MolecularWeight(112) = 251
    MolecularWeight(113) = 252
    MolecularWeight(114) = 257
    MolecularWeight(115) = 258
    MolecularWeight(116) = 259
    MolecularWeight(117) = 80.0582
    MolecularWeight(118) = 141.94452
    MolecularWeight(119) = 28.0134
    MolecularWeight(120) = 44.0098
    MolecularWeight(121) = 28.0104
    MolecularWeight(122) = 17.0304
    MolecularWeight(123) = 18.0383
    MolecularWeight(124) = 80.0432
    ' UBound return max index of array LBound return min index of array, = 0
    Dim oxideN As Long
    oxideN = UBound(Formula) - LBound(Formula) + 1
    Dim i As Long
    Dim result As Double
    result = -1
    For i = 0 To (oxideN - 1)
        ' upcase word
        If UCase(Trim(name)) = UCase(Formula(i)) Then
            result = MolecularWeight(i)
            Exit For
        Else
        End If
    Next
    If result = -1 Then
        GETMOLES = -1
    Else
        GETMOLES = result
    End If
End Function
```

{{< /expand >}}

{{< /tab >}}

{{< /tabs >}}

## remove non-number format of table from web pages of literature

> The best way to collate data of paper is to copy from its web sites. Data tables in web, however, contain non-number format, e.g. `-`(looks like minus but isn't), `-11.63(221)`, `58.5 ± 2·3`.


![getNumber](/images/posts/getnumber.gif)

{{< expand "All codes" >}}

``` VB.net
Function GETNUMBER(text)

    temptext = text
    text = Trim(text)
    If Len(text) > 0 Then
    
        If Not IsNumeric(text) Then
            
            ' 常见格式：2.48(5)  2.48 (5)  2.48 ±2  3·52?  2.48(5) 1,000
            ' 区分需要替换的符号和去除的符号
            ' 需要去除的
            Dim BlankIndex As Long
            BlankIndex = InStr(1, text, " ")
            If BlankIndex = 0 Then
                BlankIndex = 100000
            End If
                
            
            Dim LeftBracketIndex As Long
            LeftBracketIndex = InStr(1, text, "(")
            If LeftBracketIndex = 0 Then
                LeftBracketIndex = 100000
            End If
            
            Dim RightBracketIndex As Long
            RightBracketIndex = InStr(1, text, ")")
            If RightBracketIndex = 0 Then
                RightBracketIndex = 100000
            End If
            
            Dim QuestionMarkIndex As Long
            QuestionMarkIndex = InStr(1, text, "?")
            If QuestionMarkIndex = 0 Then
                QuestionMarkIndex = 100000
            End If
           
            Dim PlusMinusIndex As Long
            PlusMinusIndex = InStr(1, text, "±")
            If PlusMinusIndex = 0 Then
                PlusMinusIndex = 100000
            End If

            
            minindex = WorksheetFunction.Min(BlankIndex, LeftBracketIndex, RightBracketIndex, QuestionMarkIndex, PlusMinusIndex)
            
            If minindex < 100000 Then
            
                text = Left(text, minindex - 1)
            End If
            
                                    
            ' 需要替换的
            Dim DotIndex As Long
            DotIndex = InStr(1, text, "·")
            If Not DotIndex = 0 Then
                text = Replace(text, "·", ".", 1, 1)
            End If
            
            Dim CommaIndex As Long
            CommaIndex = InStr(1, text, ",")
            If Not CommaIndex = 0 Then
                text = Replace(text, ",", "", 1, 1)
            End If
            
           
            
            If Val(text) = 0 Then
            
            
                If Len(text) > 1 Then
                
                   If (Asc(Left(text, 1)) >= 65 And Asc(Left(text, 1)) <= 90) Or (Asc(Left(text, 1)) >= 97 And Asc(Left(text, 1)) <= 122) Then
                   
                       GETNUMBER = temptext
                   Else
                       GETNUMBER = Val("-" & Right(text, Len(text) - 1))
        
                   End If
                Else
                    GETNUMBER = temptext
                    
                End If
                    
            Else
                
                GETNUMBER = Val(text)
            End If
            
            
        Else

            GETNUMBER = Val(text)
        End If
    End If
    
    

End Function
```

{{< /expand >}}

## extra error values

> upcoming

