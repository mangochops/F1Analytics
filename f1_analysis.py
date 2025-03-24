import fastf1
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from fastf1 import plotting

# Enable the cache to speed up data loading
fastf1.Cache.enable_cache('cache')

# Set up plotting
plotting.setup_mpl(mpl_timedelta_support=True, color_scheme='fastf1')

print("Loading 2023 Miami Grand Prix qualifying session...")
# Load the session data
quali = fastf1.get_session(2023, 'Miami', 'Q')
quali.load()
print("Session loaded successfully!")

# Get the fastest lap for each driver
fastest_laps = quali.laps.pick_fastest()

# Display the top 5 fastest laps
print("\nTop 5 Fastest Qualifying Laps:")
top5 = fastest_laps.sort_values('LapTime').iloc[:5]
for i, lap in top5.iterrows():
    driver = lap['Driver']
    team = lap['Team']
    lap_time = lap['LapTime']
    print(f"{driver} ({team}): {lap_time}")

# Let's analyze the lap time differences
pole_lap = fastest_laps.pick_fastest()
pole_driver = pole_lap['Driver']
pole_time = pole_lap['LapTime']

print(f"\nPole position: {pole_driver} with {pole_time}")

# Calculate gap to pole for each driver
fastest_laps['GapToPole'] = fastest_laps['LapTime'] - pole_time
fastest_laps = fastest_laps.sort_values('GapToPole')

# Plot the gap to pole
plt.figure(figsize=(12, 6))
plt.bar(fastest_laps['Driver'], fastest_laps['GapToPole'].dt.total_seconds())
plt.title(f'Gap to Pole Position ({pole_driver})')
plt.xlabel('Driver')
plt.ylabel('Gap (seconds)')
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig('gap_to_pole.png')

# Let's also analyze telemetry for the top 2 drivers
print("\nAnalyzing telemetry for top 2 drivers...")
driver1 = fastest_laps.iloc[0]['Driver']
driver2 = fastest_laps.iloc[1]['Driver']

lap1 = quali.laps.pick_driver(driver1).pick_fastest()
lap2 = quali.laps.pick_driver(driver2).pick_fastest()

# Get telemetry data
telemetry1 = lap1.get_telemetry()
telemetry2 = lap2.get_telemetry()

# Plot speed comparison
plt.figure(figsize=(12, 6))
plt.plot(telemetry1['Distance'], telemetry1['Speed'], label=driver1)
plt.plot(telemetry2['Distance'], telemetry2['Speed'], label=driver2)
plt.title(f'Speed Comparison: {driver1} vs {driver2}')
plt.xlabel('Distance (m)')
plt.ylabel('Speed (km/h)')
plt.legend()
plt.tight_layout()
plt.savefig('speed_comparison.png')

print("\nAnalysis complete! Check the output for visualizations.")

