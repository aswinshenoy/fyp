from django.contrib import admin

from sample.models import State, District, Location, ParameterGroup, Parameter, TestSourceType, TestRecord


@admin.register(State)
class StateAdmin(admin.ModelAdmin):
    search_fields = ['name', 'slug']
    list_display = ['name', 'slug']


@admin.register(District)
class DistrictAdmin(admin.ModelAdmin):
    search_fields = ['name', 'slug']
    list_display = ['name', 'state', 'slug']
    list_filter = ['state']
    autocomplete_fields = ['state']


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_display = ['name', 'district']
    autocomplete_fields = ['district']


@admin.register(ParameterGroup)
class ParameterGroupAdmin(admin.ModelAdmin):
    search_fields = ['name', 'slug']


@admin.register(Parameter)
class ParameterAdmin(admin.ModelAdmin):
    autocomplete_fields = ['group']
    search_fields = ['name', 'slug']
    list_display = ['name', 'slug', 'group']
    list_filter = ['group']


@admin.register(TestSourceType)
class TestSourceTypeAdmin(admin.ModelAdmin):
    search_fields = ['name', 'slug']
    list_display = ['name', 'slug']


@admin.register(TestRecord)
class TestSampleAdmin(admin.ModelAdmin):
    search_fields = ['location__name', 'parameter__name', 'location__district__name', 'location__district__state__name']
    autocomplete_fields = ['location', 'parameter', 'source']
    list_display = ['id', 'parameter', 'value', 'location', 'source', 'timestamp']
    list_filter = ['parameter', 'source', 'timestamp']
