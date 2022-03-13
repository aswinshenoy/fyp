from django.contrib import admin

from sample.models import TestSample, Location


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    pass


@admin.register(TestSample)
class TestSampleAdmin(admin.ModelAdmin):
    list_display = ['id', 'location', 'wqi']
