

def calculate_wqi(
    manganese, iron, nitrate, arsenic, chloride, fluoride, sulphate, copper, tds, ph, hardness, alkalinity, turbidity
):
    if manganese != 0:
        manganese = round(((float(manganese) / 0.1) * 100 * 0.789), 4)
    if iron != 0:
        iron = round((float(iron) / 0.3) * 100 * 0.026, 4)
    if nitrate != 0:
        nitrate = round((float(nitrate) / 45) * 100 * 0.135, 4)
    if arsenic != 0:
        arsenic = round((float(arsenic) / 0.01) * 100 * 0.1315, 4)
    if chloride != 0:
        chloride = round((float(chloride) / 250) * 100 * 0.1315, 4)
    if fluoride != 0:
        fluoride = round((float(fluoride) / 1) * 100 * 0.1315, 4)
    if sulphate != 0:
        sulphate = round((float(sulphate) / 200) * 100 * 0.789, 4)
    if copper != 0:
        copper = round((float(copper) / 0.05) * 100 * 0.789, 4)
    if tds != 0:
        tds = round((float(tds) / 500) * 100 * 0.0789, 4)
    if ph != 0:
        ph = round((float(ph) - 7) / (8.5 - 7) * 100 * 0.0789, 4)
    if hardness != 0:
        hardness = round((float(hardness) / 200) * 100 * 0.02631, 4)
    if alkalinity != 0:
        alkalinity = round((float(alkalinity) / 200) * 100 * 0.0263, 4)
    if turbidity != 0:
        turbidity = round((float(turbidity) / 200) * 100 * 0.0263, 4)
    return round(
        (
            manganese +
            iron +
            nitrate +
            arsenic +
            fluoride +
            chloride +
            sulphate +
            copper +
            tds +
            ph +
            hardness +
            alkalinity +
            turbidity
        ),
        5
    )


__all__ = [
    'calculate_wqi'
]
