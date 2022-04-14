from django.db import models


class Location(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, default='')
    district = models.CharField(max_length=100, default='TVM')
    state = models.CharField(max_length=6, default='KL')

    class Meta:
        db_table = 'location'
        verbose_name_plural = "Locations"
        verbose_name = "Location"

    def __str__(self):
        return str(self.name)


class TestSample(models.Model):
    id = models.BigAutoField(primary_key=True)
    location = models.ForeignKey(
        'sample.Location',
        on_delete=models.CASCADE,
        null=True, blank=True
    )
    source = models.CharField(max_length=25, default='UNKNOWN')
    date = models.DateField(null=True, blank=True)

    manganese = models.FloatField(default=0)
    iron = models.FloatField(default=0)
    nitrate = models.FloatField(default=0)
    arsenic = models.FloatField(default=0)
    fluoride = models.FloatField(default=0)
    chloride = models.FloatField(default=0)
    sulphate = models.FloatField(default=0)
    copper = models.FloatField(default=0)

    tds = models.FloatField(default=0)
    ph = models.FloatField(default=0)
    hardness = models.FloatField(default=0)
    alkalinity = models.FloatField(default=0)
    turbidity = models.FloatField(default=0)

    coliform = models.FloatField(default=0)
    ecoil = models.FloatField(default=0)

    wqi = models.FloatField(default=0)

    isPhyContaminated = models.BooleanField(default=False)
    isCheContaminated = models.BooleanField(default=False)
    isBioContaminated = models.BooleanField(default=False)

    def cal_phy_contamination(self):
        if self.tds and self.tds > 200:
            return True
        if self.ph and self.ph < 6.5 or self.ph > 8.5:
            return True
        if self.hardness and self.hardness > 200:
            return True
        if self.alkalinity and self.alkalinity > 200:
            return True
        return False

    def cal_che_contamination(self):
        if self.manganese and self.manganese > 250:
            return True
        if self.sulphate and self.sulphate > 0.01:
            return True
        if self.chloride and self.chloride > 250:
            return True
        if self.copper and self.copper > 0.05:
            return True
        if self.fluoride and self.fluoride > 1:
            return True
        if self.iron and self.iron > 0.3:
            return True
        if self.nitrate and self.nitrate > 45:
            return True
        if self.sulphate and self.arsenic > 0.01:
            return True
        return False

    def cal_bio_contamination(self):
        if self.ecoil and self.ecoil > 0:
            return True
        if self.coliform and self.coliform > 0:
            return True
        return False

    @property
    def WQI(self):
        manganese = round(((float(self.manganese) / 0.1) * 100 * 0.789), 4)
        iron = round((float(self.iron) / 0.3) * 100 * 0.026, 4)
        nitrate = round((float(self.nitrate) / 45) * 100 * 0.135, 4)
        arsenic = round((float(self.arsenic) / 0.01) * 100 * 0.1315, 4)
        fluoride = round((float(self.fluoride) / 1) * 100 * 0.1315, 4)
        chloride = round((float(self.chloride) / 250) * 100 * 0.1315, 4)
        sulphate = round((float(self.sulphate) / 200) * 100 * 0.789, 4)
        copper = round((float(self.copper) / 0.05) * 100 * 0.789, 4)
        tds = round((float(self.tds) / 500) * 100 * 0.0789, 4)
        ph = round((float(self.ph) - 7) / (8.5 - 7) * 100 * 0.0789, 4)
        hardness = round((float(self.hardness) / 200) * 100 * 0.02631, 4)
        alkalinity = round((float(self.alkalinity) / 200) * 100 * 0.0263, 4)
        turbidity = round((float(self.turbidity) / 200) * 100 * 0.0263, 4)
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

    def set_wqi(self):
        self.wqi = self.WQI

    @property
    def WQI_group(self) -> str:
        if self.WQI < 50:
            return 'Excellent'
        elif self.WQI < 100:
            return 'Good'
        elif self.WQI < 200:
            return 'Poor'
        elif self.WQI < 300:
            return 'Very Poor'
        return 'Unsuitable'

    @property
    def hasColiform(self):
        return self.coliform > 0

    @property
    def hasEcoil(self):
        return self.ecoil > 0

    @property
    def hasBacteria(self):
        return self.hasColiform or self.hasEcoil

    class Meta:
        db_table = 'sample'
        verbose_name_plural = "Test Samples"
        verbose_name = "Test Sample"

    def __str__(self):
        return str(self.id)


# @receiver(post_save, sender=TestSample)
# def signal_submission_post_save(sender, instance: TestSample, created, **kwargs):
#     instance.location.calc_metrics()


__all__ = [
    'Location',
    'TestSample'
]
