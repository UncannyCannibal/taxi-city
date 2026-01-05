# Taxi City

A dynamic taxi simulation game where you manage your own taxi business, pick up passengers, and navigate through a bustling city environment.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Gameplay Guide](#gameplay-guide)
- [Controls](#controls)
- [Game Mechanics](#game-mechanics)
- [Economy System](#economy-system)
- [Tips and Strategies](#tips-and-strategies)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Overview

Taxi City is a simulation game that puts you in the driver's seat of a taxi business. Navigate through a vibrant urban environment, pick up passengers, complete rides, and build a profitable taxi operation. The game combines strategic decision-making with real-time driving mechanics to create an engaging and immersive experience.

## Features

- **Dynamic City Environment**: Navigate through a living, breathing city with traffic, pedestrians, and various locations
- **Passenger Management**: Pick up and drop off passengers at their requested destinations
- **Economy System**: Earn money from fares, manage expenses, and reinvest in your business
- **Vehicle Upgrades**: Improve your taxi's performance, comfort, and fuel efficiency
- **Multiple Game Modes**:
  - Classic Mode: Build your taxi business from the ground up
  - Time Challenge: Complete as many rides as possible within a time limit
  - Delivery Mode: Transport packages and cargo
  - Story Mode: Follow a narrative-driven campaign
- **Customization**: Personalize your taxi with different colors, accessories, and upgrades
- **Career Progression**: Unlock new features and areas as you progress
- **Realistic Physics**: Engaging driving mechanics with traffic rules and penalties

## Installation

### Prerequisites

- Operating System: Windows 10+, macOS 10.14+, or Linux
- RAM: Minimum 4GB
- Storage: 2GB available space
- Graphics: OpenGL 3.0+ compatible

### Download and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/UncannyCannibal/taxi-city.git
   cd taxi-city
   ```

2. Install dependencies:
   ```bash
   # For Node.js based projects
   npm install
   
   # For Python based projects
   pip install -r requirements.txt
   
   # For other package managers, refer to the project structure
   ```

3. Build the project:
   ```bash
   npm run build
   # or
   python setup.py build
   ```

4. Run the game:
   ```bash
   npm start
   # or
   python main.py
   ```

## Getting Started

### First Launch

1. **Create Your Profile**: Enter your name and choose a starting city
2. **Select Difficulty**: Choose between Easy, Normal, and Hard difficulties
3. **Tutorial Mode**: Complete the optional tutorial to learn game basics
4. **Initial Capital**: You'll receive starting money to purchase your first taxi

### Your First Ride

1. Navigate to a taxi stand or wait for a passenger to flag you down
2. Accept the ride and follow the GPS to the destination
3. Drive safely and avoid traffic violations
4. Arrive at the destination and collect your fare
5. Complete the fare payment and return to pickup locations

## Gameplay Guide

### Accepting Rides

Passengers will appear at various locations throughout the city. You can:
- Respond to passenger requests shown on your radar
- Visit taxi stands to pick up waiting passengers
- Accept ride requests through the in-game app
- Priority: VIP passengers offer higher fares but have stricter requirements

### Navigation

- Use the GPS system to navigate to destinations
- Follow traffic rules to avoid penalties
- Take shortcuts through the city to optimize routes
- Monitor fuel levels and plan pit stops at gas stations

### Passenger Satisfaction

Your rating depends on:
- **On-Time Arrival**: Complete rides within the estimated time
- **Vehicle Condition**: Keep your taxi clean and well-maintained
- **Driving Behavior**: Avoid speeding, reckless driving, and traffic violations
- **Route Efficiency**: Take reasonable routes without excessive detours

Higher ratings unlock better passengers and premium fares.

### Maintenance

Regular maintenance is essential:
- **Fuel**: Monitor fuel consumption; refuel at gas stations
- **Service**: Schedule routine maintenance to prevent breakdowns
- **Cleanliness**: Keep your taxi clean for better passenger satisfaction
- **Insurance**: Maintain insurance to cover accident-related costs

## Controls

### Driving

| Action | Control |
|--------|---------|
| Accelerate | W / Up Arrow / Gamepad RT |
| Brake | S / Down Arrow / Gamepad LT |
| Turn Left | A / Left Arrow / Gamepad Left |
| Turn Right | D / Right Arrow / Gamepad Right |
| Handbrake | Space / Gamepad X |
| Reverse | R / Gamepad B |

### Interface

| Action | Control |
|--------|---------|
| Map | M / Gamepad LB |
| Menu | Esc / Gamepad Menu |
| Accept Ride | Enter / Gamepad A |
| Decline Ride | Backspace / Gamepad Y |
| Horn | H / Gamepad LT+RT |
| Lights | L / Gamepad LB |

## Game Mechanics

### Fare System

Fares are calculated based on:
- **Base Fare**: Starting charge for each ride
- **Distance**: Per-kilometer/mile charge
- **Time**: Waiting time surcharge
- **Multipliers**: Peak hour bonuses, VIP passenger premiums
- **Modifiers**: Weather conditions, traffic congestion, difficulty setting

```
Total Fare = (Base Fare + Distance × Rate + Time × Waiting Rate) × Multiplier
```

### Traffic Rules

Violations result in fines and rating penalties:
- **Speeding**: -$50-200 fine + rating penalty
- **Running Red Light**: -$100 fine + rating penalty
- **Illegal Parking**: -$75 fine
- **Collision**: -$200-500 fine + vehicle damage
- **Reckless Driving**: -$150 fine + rating penalty

### Fuel Management

- Fuel consumption varies by:
  - Vehicle type and condition
  - Driving style (aggressive driving uses more fuel)
  - Traffic conditions and idling
  - Vehicle upgrades (aerodynamics, engine efficiency)

## Economy System

### Income Sources

- **Regular Fares**: Primary income from passenger rides
- **Bonuses**: Time bonuses, accuracy bonuses, rating streaks
- **Special Missions**: High-paying deliveries and VIP rides
- **Achievements**: Rewards for completing milestones

### Expenses

- **Fuel**: Regular operational cost
- **Maintenance**: Periodic repairs and service
- **Insurance**: Accident coverage and liability
- **Vehicle Upgrades**: Improvements to performance and appearance
- **Taxes**: Government levies on earnings
- **Licenses and Permits**: Required regulatory costs

### Business Expansion

As your capital grows, you can:
- Purchase additional vehicles
- Hire other drivers to work for you
- Unlock new city areas
- Upgrade your taxi stand/garage
- Expand service offerings

## Tips and Strategies

### Earning More Money

1. **Focus on Rating**: Higher ratings unlock better passengers with premium fares
2. **Time Management**: Complete rides quickly; time bonuses add up
3. **Peak Hours**: Drive during peak traffic hours for surge pricing
4. **VIP Passengers**: Accept VIP rides for higher payouts
5. **Complete Achievements**: Many achievements offer substantial rewards
6. **Fuel Efficiency**: Upgrade your engine to reduce fuel costs

### Avoiding Penalties

1. **Follow Traffic Rules**: Stay below speed limits and obey signals
2. **Plan Routes Carefully**: Use the GPS wisely and avoid detours
3. **Maintain Your Vehicle**: Regular maintenance prevents breakdowns
4. **Drive Defensively**: Avoid collisions and risky maneuvers
5. **Respect Passengers**: Drive smoothly and take reasonable routes

### Vehicle Selection

Different vehicles suit different playstyles:
- **Sedan**: Balanced stats, good for beginners
- **SUV**: Higher capacity, better for group rides
- **Sports Car**: Faster, better for time-based challenges
- **Hybrid**: Fuel-efficient, eco-friendly option
- **Luxury**: Premium passengers, higher fares

## Development

### Project Structure

```
taxi-city/
├── src/
│   ├── main/          # Main game loop and initialization
│   ├── game/          # Core game logic
│   ├── ui/            # User interface components
│   ├── physics/       # Physics engine
│   └── assets/        # Game resources
├── assets/
│   ├── models/        # 3D models and sprites
│   ├── textures/      # Game textures
│   ├── audio/         # Sound effects and music
│   └── data/          # Game data files
├── docs/              # Documentation
├── tests/             # Unit and integration tests
├── package.json       # Dependencies (Node.js)
└── README.md          # This file
```

### Building from Source

```bash
# Install development dependencies
npm install --save-dev

# Run linter
npm run lint

# Run tests
npm test

# Build for production
npm run build:prod
```

### Adding Content

To add new content to the game:
1. Create assets in the appropriate `assets/` subdirectory
2. Register content in the relevant game system
3. Test thoroughly in different scenarios
4. Submit a pull request with detailed documentation

## Contributing

We welcome contributions from the community! Here's how you can help:

### Reporting Bugs

1. Check existing issues to avoid duplicates
2. Provide detailed reproduction steps
3. Include your system specifications
4. Attach relevant logs or screenshots

### Submitting Features

1. Discuss major features in an issue first
2. Follow the existing code style
3. Write tests for new functionality
4. Update documentation accordingly
5. Submit a pull request with a clear description

### Code Guidelines

- Use consistent indentation (2 spaces for JavaScript)
- Write meaningful commit messages
- Keep functions small and focused
- Add comments for complex logic
- Follow existing naming conventions

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

Need help? Here are your options:

### Documentation

- Check the [Wiki](../../wiki) for detailed guides
- Review [FAQ](docs/FAQ.md) for common questions
- Explore [Tutorials](docs/TUTORIALS.md) for step-by-step guides

### Community

- Join our [Discord Server](https://discord.gg/example)
- Follow us on [Twitter](https://twitter.com/example)
- Visit our [Forums](https://forums.example.com)

### Reporting Issues

- Use [GitHub Issues](../../issues) for bug reports
- Provide detailed information about your problem
- Include screenshots or videos when possible

### Contact

- Email: support@example.com
- Discord: [Community Server](https://discord.gg/example)

---

**Last Updated**: 2026-01-05

Thank you for playing Taxi City! We hope you enjoy building your taxi empire!
