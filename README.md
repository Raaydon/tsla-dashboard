# tesla dashboard

A Python implementation based on [unofficial documentation](https://tesla-api.timdorr.com/) of the client side interface to the Tesla Motors Owner API, which provides functionality to monitor and control Tesla products remotely.
The dashboard is made using [react](https://reactjs.org/) and built with [vite](https://vite.io/).

## to run the website locally:

```
npm i
npm run dev
```
this will be ran on [http://localhost:3000](http://localhost:3000)

## to run the server locally:

Make sure you have Python 2.7+ or 3.5+ installed on your system

```
python -m pip install requests_oauthlib geopy pywebview selenium websocket-client flask flask_cors waitress
```

and install ChromeDriver to use Selenium or on Ubuntu as follows:

```
sudo apt-get install python3-requests-oauthlib python3-geopy python3-webview python3-selenium python3-websocket
```

If you prefer Firefox, install GeckoDriver or on Ubuntu as follows:

```
sudo apt-get install firefox-geckodriver
```

to run the server:

```
python tesla_api.py
```
this will be ran on [http://localhost:5000](http://localhost:5000)

# example data


## Vehicle data

Example output of `get_vehicle_data()`below:

```json
{
    "id": 12345678901234567,
    "vehicle_id": 1234567890,
    "vin": "5YJ3E111111111111",
    "display_name": "Tim's Tesla",
    "option_codes": "AD15,MDL3,PBSB,RENA,BT37,ID3W,RF3G,S3PB,DRLH,DV2W,W39B,APF0,COUS,BC3B,CH07,PC30,FC3P,FG31,GLFR,HL31,HM31,IL31,LTPB,MR31,FM3B,RS3H,SA3P,STCP,SC04,SU3C,T3CA,TW00,TM00,UT3P,WR00,AU3P,APH3,AF00,ZCST,MI00,CDM0",
    "color": null,
    "tokens": [
        "1234567890abcdef",
        "abcdef1234567890"
    ],
    "state": "online",
    "in_service": false,
    "id_s": "12345678901234567",
    "calendar_enabled": true,
    "api_version": 6,
    "backseat_token": null,
    "backseat_token_updated_at": null,
    "user_id": 123456,
    "charge_state": {
        "battery_heater_on": false,
        "battery_level": 44,
        "battery_range": 99.84,
        "charge_current_request": 16,
        "charge_current_request_max": 16,
        "charge_enable_request": true,
        "charge_energy_added": 14.54,
        "charge_limit_soc": 90,
        "charge_limit_soc_max": 100,
        "charge_limit_soc_min": 50,
        "charge_limit_soc_std": 90,
        "charge_miles_added_ideal": 66.5,
        "charge_miles_added_rated": 66.5,
        "charge_port_cold_weather_mode": false,
        "charge_port_door_open": true,
        "charge_port_latch": "Engaged",
        "charge_rate": 455.7,
        "charge_to_max_range": false,
        "charger_actual_current": 0,
        "charger_phases": null,
        "charger_pilot_current": 16,
        "charger_power": 100,
        "charger_voltage": 2,
        "charging_state": "Charging",
        "conn_charge_cable": "IEC",
        "est_battery_range": 78.13,
        "fast_charger_brand": "Tesla",
        "fast_charger_present": true,
        "fast_charger_type": "Combo",
        "ideal_battery_range": 99.84,
        "managed_charging_active": false,
        "managed_charging_start_time": null,
        "managed_charging_user_canceled": false,
        "max_range_charge_counter": 1,
        "minutes_to_full_charge": 15,
        "not_enough_power_to_heat": null,
        "scheduled_charging_pending": false,
        "scheduled_charging_start_time": null,
        "time_to_full_charge": 0.25,
        "timestamp": 1569952097456,
        "trip_charging": true,
        "usable_battery_level": 44,
        "user_charge_enable_request": null
    },
    "climate_state": {
        "battery_heater": false,
        "battery_heater_no_power": null,
        "climate_keeper_mode": "off",
        "driver_temp_setting": 21.0,
        "fan_status": 3,
        "inside_temp": 21.0,
        "is_auto_conditioning_on": true,
        "is_climate_on": true,
        "is_front_defroster_on": false,
        "is_preconditioning": false,
        "is_rear_defroster_on": false,
        "left_temp_direction": 54,
        "max_avail_temp": 28.0,
        "min_avail_temp": 15.0,
        "outside_temp": 13.5,
        "passenger_temp_setting": 21.0,
        "remote_heater_control_enabled": true,
        "right_temp_direction": 54,
        "seat_heater_left": 0,
        "seat_heater_right": 0,
        "side_mirror_heaters": false,
        "smart_preconditioning": false,
        "timestamp": 1569952097456,
        "wiper_blade_heater": false
    },
    "drive_state": {
        "gps_as_of": 1569952096,
        "heading": 240,
        "latitude": 52.531951,
        "longitude": 6.156999,
        "native_latitude": 52.531951,
        "native_location_supported": 1,
        "native_longitude": 6.156999,
        "native_type": "wgs",
        "power": -100,
        "shift_state": null,
        "speed": null,
        "timestamp": 1569952097456
    },
    "gui_settings": {
        "gui_24_hour_time": true,
        "gui_charge_rate_units": "km/hr",
        "gui_distance_units": "km/hr",
        "gui_range_display": "Rated",
        "gui_temperature_units": "C",
        "show_range_units": false,
        "timestamp": 1569952097456
    },
    "vehicle_config": {
        "can_accept_navigation_requests": true,
        "can_actuate_trunks": true,
        "car_special_type": "base",
        "car_type": "model3",
        "charge_port_type": "CCS",
        "eu_vehicle": true,
        "exterior_color": "SolidBlack",
        "has_air_suspension": false,
        "has_ludicrous_mode": false,
        "key_version": 2,
        "motorized_charge_port": true,
        "plg": false,
        "rear_seat_heaters": 0,
        "rear_seat_type": null,
        "rhd": false,
        "roof_color": "Glass",
        "seat_type": null,
        "spoiler_type": "None",
        "sun_roof_installed": null,
        "third_row_seats": "<invalid>",
        "timestamp": 1569952097456,
        "use_range_badging": true,
        "wheel_type": "Pinwheel18"
    },
    "vehicle_state": {
        "api_version": 6,
        "autopark_state_v2": "unavailable",
        "calendar_supported": true,
        "car_version": "2019.32.11.1 d39e85a",
        "center_display_state": 2,
        "df": 0,
        "dr": 0,
		"fd_window": 0,
        "fp_window": 0,
        "ft": 0,
        "is_user_present": true,
        "locked": false,
        "media_state": {
            "remote_control_enabled": true
        },
        "notifications_supported": true,
        "odometer": 6963.081561,
        "parsed_calendar_supported": true,
        "pf": 0,
        "pr": 0,
		"rd_window": 0,
        "remote_start": false,
        "remote_start_enabled": true,
        "remote_start_supported": true,
		"rp_window": 0,
        "rt": 0,
        "sentry_mode": false,
        "sentry_mode_available": true,
        "software_update": {
            "expected_duration_sec": 2700,
            "status": ""
        },
        "speed_limit_mode": {
            "active": false,
            "current_limit_mph": 85.0,
            "max_limit_mph": 90,
            "min_limit_mph": 50,
            "pin_code_set": false
        },
        "sun_roof_percent_open": null,
        "sun_roof_state": "unknown",
        "timestamp": 1569952097456,
        "valet_mode": false,
        "valet_pin_needed": true,
        "vehicle_name": "Tim's Tesla"
    }
}
```

## Powerwall data

Example output of `get_battery_data()` below:

```json
{
    "energy_site_id": 111110110110,
    "resource_type": "battery",
    "site_name": "Elon's House",
    "id": "STE10110111-00101",
    "gateway_id": "1111100-11-A--AAA11110A1A111",
    "asset_site_id": "a1100111-1a11-1aaa-a111-1a0011aa1111",
    "energy_left": 0,
    "total_pack_energy": 13746,
    "percentage_charged": 0,
    "battery_type": "ac_powerwall",
    "backup_capable": true,
    "battery_power": 0,
    "sync_grid_alert_enabled": false,
    "breaker_alert_enabled": false,
    "components": {
        "solar": true,
        "solar_type": "pv_panel",
        "battery": true,
        "grid": true,
        "backup": true,
        "gateway": "teg",
        "load_meter": true,
        "tou_capable": true,
        "storm_mode_capable": true,
        "flex_energy_request_capable": false,
        "car_charging_data_supported": false,
        "off_grid_vehicle_charging_reserve_supported": false,
        "vehicle_charging_performance_view_enabled": false,
        "vehicle_charging_solar_offset_view_enabled": false,
        "battery_solar_offset_view_enabled": true,
        "show_grid_import_battery_source_cards": true,
        "battery_type": "ac_powerwall",
        "configurable": false,
        "grid_services_enabled": false
    },
    "grid_status": "Active",
    "backup": {
        "backup_reserve_percent": 0,
        "events": null
    },
    "user_settings": {
        "storm_mode_enabled": false,
        "sync_grid_alert_enabled": false,
        "breaker_alert_enabled": false
    },
    "default_real_mode": "self_consumption",
    "operation": "self_consumption",
    "installation_date": "2020-01-01T10:10:00+08:00",
    "power_reading": [
        {
            "timestamp": "2021-02-24T04:25:39+08:00",
            "load_power": 5275,
            "solar_power": 3,
            "grid_power": 5262,
            "battery_power": 10,
            "generator_power": 0
        }
    ],
    "battery_count": 1
}
```