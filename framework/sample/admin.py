from django.contrib import admin

from sample.models import State, District, Location, ParameterGroup, Parameter, TestSourceType, TestRecord


@admin.register(State)
class StateAdmin(admin.ModelAdmin):
    pass


@admin.register(District)
class DistrictAdmin(admin.ModelAdmin):
    pass


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    pass


@admin.register(ParameterGroup)
class ParameterGroupAdmin(admin.ModelAdmin):
    pass


@admin.register(Parameter)
class ParameterAdmin(admin.ModelAdmin):
    pass


@admin.register(TestSourceType)
class TestSourceTypeAdmin(admin.ModelAdmin):
    pass


@admin.register(TestRecord)
class TestSampleAdmin(admin.ModelAdmin):
    list_display = ['id', 'parameter', 'value', 'location']
