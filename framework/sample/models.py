from django.db import models
from django.utils import timezone


class State(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, max_length=100)

    @property
    def type(self):
        return 'state'

    class Meta:
        db_table = 'state'
        verbose_name_plural = "States"
        verbose_name = "State"

    def __str__(self):
        return str(self.name)


class District(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, max_length=100)
    state = models.ForeignKey(
        'sample.State',
        on_delete=models.CASCADE,
        null=True, blank=True
    )

    @property
    def type(self):
        return 'district'

    class Meta:
        db_table = 'district'
        verbose_name_plural = "Districts"
        verbose_name = "District"

    def __str__(self):
        return str(self.name)


class Location(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, default='')
    district = models.ForeignKey(
        'sample.District',
        on_delete=models.CASCADE,
        null=True, blank=True
    )

    @property
    def type(self):
        return 'location'

    class Meta:
        db_table = 'location'
        verbose_name_plural = "Locations"
        verbose_name = "Location"

    def __str__(self):
        return str(self.name)


class ParameterGroup(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, max_length=100)

    class Meta:
        db_table = 'parameter_group'
        verbose_name_plural = "Parameter Groups"
        verbose_name = "Parameter Group"

    def __str__(self):
        return str(self.name)


class Parameter(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, max_length=100)
    minValue = models.FloatField(null=0)
    maxValue = models.FloatField(null=True)
    group = models.ForeignKey(
        'sample.ParameterGroup',
        on_delete=models.SET_NULL,
        null=True, blank=True
    )

    class Meta:
        db_table = 'parameter'
        verbose_name_plural = "Parameters"
        verbose_name = "Parameter"

    def __str__(self):
        return str(self.name)


class TestSourceType(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, max_length=100)

    class Meta:
        db_table = 'test_source_type'
        verbose_name_plural = "Test Source Types"
        verbose_name = "Test Source Type"

    def __str__(self):
        return str(self.name)


class TestRecord(models.Model):
    id = models.BigAutoField(primary_key=True)
    location = models.ForeignKey(
        'sample.Location',
        on_delete=models.CASCADE,
    )
    parameter = models.ForeignKey(
        'sample.Parameter',
        on_delete=models.CASCADE,
    )
    value = models.FloatField()
    timestamp = models.DateTimeField(
        default=timezone.now
    )
    source = models.ForeignKey(
        'sample.TestSourceType',
        on_delete=models.CASCADE,
        null=True, blank=True
    )

    class Meta:
        db_table = 'test_record'
        verbose_name_plural = "Test Records"
        verbose_name = "Test Record"

    def __str__(self):
        return str(self.id)


__all__ = [
    'State',
    'District',
    'Location',
    'ParameterGroup',
    'Parameter',
    'TestSourceType',
    'TestRecord',
]
