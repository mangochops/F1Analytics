Welcome to the Fastf1 Project documentation. This project provides tools and utilities for analyzing Formula 1 data using the fastf1 Python package.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)


## Introduction

Fastf1 Project is a comprehensive toolkit built on top of the fastf1 Python package, designed to simplify the process of accessing, analyzing, and visualizing Formula 1 data. Whether you're a data scientist, a racing enthusiast, or a team analyst, this project provides the tools you need to gain insights from F1 telemetry, timing, and other race data.

### Key Features

- **Data Access**: Easily retrieve data from F1 sessions, including practice, qualifying, and races
- **Telemetry Analysis**: Analyze car telemetry data including speed, throttle, brake, and more
- **Lap Time Comparison**: Compare lap times between drivers and sessions
- **Data Visualization**: Create insightful visualizations of race data
- **Strategy Analysis**: Tools for analyzing pit stop strategies and race pace


## Installation

### Prerequisites

- Python 3.8 or higher
- pip package manager


### Install from PyPI

```shellscript
pip install fastf1-project
```

### Install from Source

```shellscript
git clone https://github.com/yourusername/fastf1-project.git
cd fastf1-project
pip install -e .
```

## Getting Started

### Basic Usage

Here's a simple example to get you started:

```python
import fastf1_project as f1p

# Initialize a session
session = f1p.get_session(2023, 'Bahrain', 'Q')

# Load the session data
session.load()

# Get lap data for a specific driver
driver_laps = session.laps.pick_driver('VER')

# Analyze the fastest lap
fastest_lap = driver_laps.pick_fastest()
print(f"Fastest lap time: {fastest_lap['LapTime']}")

# Visualize telemetry data
f1p.plot_telemetry(fastest_lap)
```

### Authentication

Some features may require authentication with your F1 account:

```python
f1p.authenticate('your_username', 'your_password')
```

## API Reference

### Core Modules

#### `f1p.session`

Functions for accessing and managing F1 session data.

| Function | Description
|-----|-----
| `get_session(year, gp, session_type)` | Retrieves data for a specific session
| `list_events(year)` | Lists all events for a given year
| `get_current_season()` | Gets data for the current F1 season


#### `f1p.telemetry`

Functions for analyzing car telemetry data.

| Function | Description
|-----|-----
| `get_car_data(lap)` | Gets detailed car data for a specific lap
| `compare_telemetry(lap1, lap2)` | Compares telemetry between two laps
| `calculate_speed_trace(lap)` | Calculates speed trace for visualization


#### `f1p.visualization`

Functions for creating data visualizations.

| Function | Description
|-----|-----
| `plot_telemetry(lap)` | Creates a telemetry plot for a lap
| `plot_track_map(session)` | Creates a track map visualization
| `plot_strategy(race)` | Visualizes race strategy


#### `f1p.analysis`

Advanced analysis functions.

| Function | Description
|-----|-----
| `tire_degradation(driver, race)` | Analyzes tire degradation
| `race_pace_comparison(drivers, race)` | Compares race pace between drivers
| `qualifying_performance(session)` | Analyzes qualifying performance


## Examples

### Comparing Driver Performance

```python
import fastf1_project as f1p
import matplotlib.pyplot as plt

# Load the race session
race = f1p.get_session(2023, 'Monaco', 'R')
race.load()

# Compare lap times between two drivers
driver1 = 'HAM'
driver2 = 'VER'

laps_driver1 = race.laps.pick_driver(driver1)
laps_driver2 = race.laps.pick_driver(driver2)

# Plot lap time comparison
fig, ax = plt.subplots()
ax.plot(laps_driver1['LapNumber'], laps_driver1['LapTime'], label=driver1)
ax.plot(laps_driver2['LapNumber'], laps_driver2['LapTime'], label=driver2)
ax.set_title(f'Lap Time Comparison: {driver1} vs {driver2}')
ax.set_xlabel('Lap Number')
ax.set_ylabel('Lap Time (s)')
ax.legend()
plt.show()
```

### Analyzing Pit Stop Strategy

```python
import fastf1_project as f1p

# Load the race session
race = f1p.get_session(2023, 'Silverstone', 'R')
race.load()

# Analyze pit stop strategy for top 3 finishers
top_drivers = ['VER', 'HAM', 'LEC']

for driver in top_drivers:
    strategy = f1p.analysis.pit_stop_strategy(driver, race)
    print(f"\n{driver} Pit Stop Strategy:")
    print(f"Number of stops: {strategy['n_stops']}")
    print(f"Tire compounds used: {strategy['compounds']}")
    print(f"Stint lengths: {strategy['stint_lengths']}")
```

### Track Position Analysis

```python
import fastf1_project as f1p

# Load the race session
race = f1p.get_session(2023, 'Monza', 'R')
race.load()

# Analyze track position changes
position_changes = f1p.analysis.track_position_changes(race)

# Display drivers with most positions gained
print("Drivers with most positions gained:")
for driver, positions in position_changes.most_gained(5):
    print(f"{driver}: +{positions} positions")
```

## Contributing

We welcome contributions to the Fastf1 Project! Here's how you can help:

1. **Report bugs**: If you find a bug, please create an issue in our GitHub repository
2. **Suggest features**: Have an idea for a new feature? Let us know through GitHub issues
3. **Submit pull requests**: Want to contribute code? Fork the repository and submit a pull request


### Development Setup

```shellscript
# Clone the repository
git clone https://github.com/yourusername/fastf1-project.git
cd fastf1-project

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install development dependencies
pip install -e ".[dev]"

# Run tests
pytest
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## FAQ

### General Questions

**Q: Do I need an F1 subscription to use this package?**A: Basic functionality works without a subscription, but some advanced features may require F1 TV Access or F1 TV Pro.

**Q: Which seasons are supported?**A: The package supports data from the 2018 season onwards, with the most comprehensive data available for recent seasons.

### Technical Questions

**Q: How do I cache data to avoid repeated downloads?**A: The package automatically caches data. You can configure the cache directory:

```python
import fastf1_project as f1p
f1p.set_cache_directory('path/to/cache')
```

**Q: How can I export data for use in other tools?**A: You can export data to various formats:

```python
# Export to CSV
session.laps.to_csv('laps_data.csv')

# Export to Excel
session.laps.to_excel('laps_data.xlsx')

# Export telemetry to CSV
telemetry = session.laps.pick_driver('VER').pick_fastest().get_telemetry()
telemetry.to_csv('telemetry_data.csv')
```

---

## Changelog

### v1.0.0 (2023-12-15)

- Initial release with core functionality
- Support for 2023 season data
- Basic telemetry analysis tools


### v1.1.0 (2024-01-20)

- Added strategy analysis module
- Improved visualization capabilities
- Bug fixes and performance improvements


### v1.2.0 (2024-03-10)

- Added support for 2024 season data
- New track position analysis tools
- Enhanced documentation and examples


---

For more information, visit our [GitHub repository](https://github.com/mangochops/F1Analytics) 
