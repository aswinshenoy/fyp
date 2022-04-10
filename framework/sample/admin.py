from django.contrib import admin

from sample.models import TestSample, Location


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    pass


@admin.register(TestSample)
class TestSampleAdmin(admin.ModelAdmin):
    search_fields = ['location__name',]
    list_display = ['id', 'location', 'wqi', 'isPhyContaminated', 'isCheContaminated', 'isBioContaminated']
    list_filter = ['isPhyContaminated', 'isCheContaminated', 'isBioContaminated']
