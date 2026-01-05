/**
 * Taxi City Game - Complete Game Mechanics and Logic
 * A simulation game where players manage and operate a taxi fleet
 */

class GameState {
  constructor() {
    this.gameStarted = false;
    this.isPaused = false;
    this.gameTime = 0;
    this.timeScale = 1; // Multiplier for game time
    this.score = 0;
    this.money = 5000; // Starting money
    this.level = 1;
    this.maxLevel = 50;
  }

  reset() {
    this.gameStarted = false;
    this.isPaused = false;
    this.gameTime = 0;
    this.score = 0;
    this.money = 5000;
    this.level = 1;
  }
}

class Taxi {
  constructor(id, x = 0, y = 0) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.maxSpeed = 5;
    this.fuel = 100;
    this.maxFuel = 100;
    this.fuelConsumption = 0.1; // Per distance unit
    this.isMoving = false;
    this.hasPassenger = false;
    this.passengerMoney = 0;
    this.destination = null;
    this.currentRoute = [];
    this.routeIndex = 0;
    this.health = 100;
    this.maxHealth = 100;
    this.maintenanceCost = 50;
    this.maintenanceLevel = 100;
    this.earnings = 0;
    this.triopsCompleted = 0;
    this.condition = 'excellent'; // excellent, good, fair, poor
  }

  calculateCondition() {
    const healthPercent = (this.maintenanceLevel / this.maxHealth) * 100;
    if (healthPercent >= 80) this.condition = 'excellent';
    else if (healthPercent >= 60) this.condition = 'good';
    else if (healthPercent >= 40) this.condition = 'fair';
    else this.condition = 'poor';
  }

  refuel(amount) {
    this.fuel = Math.min(this.maxFuel, this.fuel + amount);
  }

  consumeFuel(distance) {
    const fuelUsed = distance * this.fuelConsumption;
    this.fuel = Math.max(0, this.fuel - fuelUsed);
    return fuelUsed;
  }

  setRoute(route) {
    this.currentRoute = route;
    this.routeIndex = 0;
    this.destination = route[route.length - 1];
  }

  moveTowardsDestination(deltaTime = 1) {
    if (!this.destination || this.routeIndex >= this.currentRoute.length) {
      this.isMoving = false;
      return false;
    }

    const currentTarget = this.currentRoute[this.routeIndex];
    const dx = currentTarget.x - this.x;
    const dy = currentTarget.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 5) {
      this.x = currentTarget.x;
      this.y = currentTarget.y;
      this.routeIndex++;
      
      if (this.routeIndex >= this.currentRoute.length) {
        this.isMoving = false;
        return true; // Destination reached
      }
    } else {
      const moveDistance = this.speed * deltaTime;
      const moveX = (dx / distance) * moveDistance;
      const moveY = (dy / distance) * moveDistance;
      
      this.x += moveX;
      this.y += moveY;
      this.consumeFuel(moveDistance);
    }

    return false;
  }

  performMaintenance() {
    this.maintenanceLevel = this.maxHealth;
    this.calculateCondition();
  }

  addEarnings(amount) {
    this.earnings += amount;
  }

  reset() {
    this.fuel = this.maxFuel;
    this.hasPassenger = false;
    this.passengerMoney = 0;
    this.isMoving = false;
    this.currentRoute = [];
    this.routeIndex = 0;
  }
}

class Passenger {
  constructor(id, pickupLocation, dropoffLocation, fare = 0) {
    this.id = id;
    this.pickupLocation = pickupLocation;
    this.dropoffLocation = dropoffLocation;
    this.fare = fare || this.calculateFare();
    this.waitTime = 0;
    this.maxWaitTime = 300; // 5 minutes in game time
    this.isWaiting = true;
    this.isTraveling = false;
    this.satisfactionLevel = 100;
    this.tipped = false;
    this.tipAmount = 0;
  }

  calculateFare() {
    const dx = this.dropoffLocation.x - this.pickupLocation.x;
    const dy = this.dropoffLocation.y - this.pickupLocation.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const baseFare = 5;
    const perUnitCost = 0.5;
    return Math.round((baseFare + distance * perUnitCost) * 100) / 100;
  }

  updateWaitTime(deltaTime = 1) {
    if (this.isWaiting) {
      this.waitTime += deltaTime;
      this.satisfactionLevel = Math.max(0, 100 - (this.waitTime / this.maxWaitTime) * 100);
      
      if (this.waitTime > this.maxWaitTime) {
        this.isWaiting = false;
        return 'passenger_left';
      }
    }
    return 'waiting';
  }

  pickUp() {
    this.isWaiting = false;
    this.isTraveling = true;
  }

  dropOff() {
    this.isTraveling = false;
    if (this.satisfactionLevel > 80) {
      this.tipped = true;
      this.tipAmount = Math.round(this.fare * 0.15 * 100) / 100;
    }
  }

  getTotalPayment() {
    return this.fare + (this.tipped ? this.tipAmount : 0);
  }
}

class GameWorld {
  constructor(width = 800, height = 600) {
    this.width = width;
    this.height = height;
    this.taxis = [];
    this.passengers = [];
    this.stations = this.generateStations();
    this.weather = 'clear'; // clear, rainy, foggy
    this.trafficLevel = 1; // 1-5 multiplier
    this.dayNight = 'day'; // day, night
  }

  generateStations() {
    return [
      { id: 1, name: 'Central Station', x: 400, y: 300, passengers: 0 },
      { id: 2, name: 'Airport', x: 700, y: 150, passengers: 0 },
      { id: 3, name: 'Downtown', x: 100, y: 200, passengers: 0 },
      { id: 4, name: 'Suburbs', x: 200, y: 500, passengers: 0 },
      { id: 5, name: 'Business District', x: 550, y: 450, passengers: 0 },
      { id: 6, name: 'Harbor', x: 50, y: 550, passengers: 0 },
    ];
  }

  addTaxi(taxi) {
    this.taxis.push(taxi);
  }

  removeTaxi(taxiId) {
    this.taxis = this.taxis.filter(t => t.id !== taxiId);
  }

  addPassenger(passenger) {
    this.passengers.push(passenger);
  }

  removePassenger(passengerId) {
    this.passengers = this.passengers.filter(p => p.id !== passengerId);
  }

  getRandomStation() {
    return this.stations[Math.floor(Math.random() * this.stations.length)];
  }

  calculateDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  generateRoute(start, end) {
    // Simple A* or Dijkstra pathfinding - simplified version
    const steps = 10;
    const route = [];
    
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = start.x + (end.x - start.x) * t;
      const y = start.y + (end.y - start.y) * t;
      // Add some noise for realism
      const noise = Math.sin(i * 0.5) * 20;
      route.push({ x: x + noise, y: y });
    }
    
    return route;
  }

  setWeather(newWeather) {
    this.weather = newWeather;
    // Adjust traffic and speed based on weather
  }

  setDayNight(time) {
    // Based on game time, determine day/night
    const hour = (time % 1440) / 60; // Convert to hours
    this.dayNight = (hour >= 6 && hour < 18) ? 'day' : 'night';
  }

  updateTraffic() {
    // Traffic based on time and random events
    this.trafficLevel = Math.random() * 4 + 1; // 1-5
  }

  getStation(stationId) {
    return this.stations.find(s => s.id === stationId);
  }
}

class GameManager {
  constructor(canvasId = 'gameCanvas') {
    this.state = new GameState();
    this.world = new GameWorld();
    this.gameStats = {
      totalTrips: 0,
      totalEarnings: 0,
      totalDistance: 0,
      currentTrips: 0,
      averageRating: 5.0,
      avgTripEarning: 0,
    };
    this.canvasId = canvasId;
    this.lastUpdateTime = Date.now();
    this.gameLoopId = null;
    this.passengerId = 0;
    this.eventLog = [];
  }

  initGame() {
    // Initialize game with starting resources
    this.state.reset();
    this.world = new GameWorld();
    
    // Add initial taxis
    for (let i = 0; i < 3; i++) {
      const taxi = new Taxi(i, Math.random() * this.world.width, Math.random() * this.world.height);
      this.world.addTaxi(taxi);
    }
    
    this.logEvent('Game started with 3 taxis');
    this.state.gameStarted = true;
  }

  startGameLoop() {
    if (this.state.gameStarted && !this.state.isPaused) {
      const now = Date.now();
      const deltaTime = (now - this.lastUpdateTime) / 1000; // Convert to seconds
      this.lastUpdateTime = now;

      this.update(deltaTime);
      this.render();

      this.gameLoopId = requestAnimationFrame(() => this.startGameLoop());
    } else {
      cancelAnimationFrame(this.gameLoopId);
    }
  }

  update(deltaTime) {
    if (this.state.isPaused) return;

    // Update game time
    this.state.gameTime += deltaTime * this.state.timeScale;

    // Update world state
    this.world.setDayNight(this.state.gameTime);
    this.world.updateTraffic();

    // Update all taxis
    this.world.taxis.forEach(taxi => {
      if (taxi.isMoving) {
        const reachedDestination = taxi.moveTowardsDestination(deltaTime);
        
        if (reachedDestination && taxi.hasPassenger) {
          this.completeTrip(taxi);
        }
      }

      // Degrade maintenance over time
      taxi.maintenanceLevel = Math.max(0, taxi.maintenanceLevel - deltaTime * 0.5);
      taxi.calculateCondition();

      // Check fuel level
      if (taxi.fuel <= 0) {
        taxi.isMoving = false;
        this.logEvent(`Taxi ${taxi.id} out of fuel!`);
      }
    });

    // Update all passengers
    this.world.passengers.forEach(passenger => {
      const status = passenger.updateWaitTime(deltaTime);
      if (status === 'passenger_left') {
        this.world.removePassenger(passenger.id);
        this.logEvent(`Passenger ${passenger.id} left due to wait time`);
      }
    });

    // Spawn new passengers periodically
    if (this.state.gameTime % 10 < deltaTime) {
      this.spawnPassenger();
    }

    // Update score and money
    this.updateGameStats();
  }

  spawnPassenger() {
    const pickup = this.world.getRandomStation();
    let dropoff = this.world.getRandomStation();
    
    // Ensure different pickup and dropoff
    while (dropoff.id === pickup.id) {
      dropoff = this.world.getRandomStation();
    }

    const passenger = new Passenger(this.passengerId++, pickup, dropoff);
    this.world.addPassenger(passenger);
    this.logEvent(`Passenger waiting at ${pickup.name}`);
  }

  assignTaxiToPassenger(taxiId, passengerId) {
    const taxi = this.world.taxis.find(t => t.id === taxiId);
    const passenger = this.world.passengers.find(p => p.id === passengerId);

    if (taxi && passenger && !taxi.hasPassenger && passenger.isWaiting) {
      // Generate route from taxi to pickup, then to dropoff
      const pickupRoute = this.world.generateRoute(
        { x: taxi.x, y: taxi.y },
        passenger.pickupLocation
      );
      const dropoffRoute = this.world.generateRoute(
        passenger.pickupLocation,
        passenger.dropoffLocation
      );

      taxi.setRoute([...pickupRoute, ...dropoffRoute]);
      taxi.isMoving = true;
      taxi.hasPassenger = true;
      taxi.passengerMoney = passenger.getTotalPayment();

      passenger.pickUp();
      this.gameStats.currentTrips++;

      this.logEvent(`Taxi ${taxiId} assigned to passenger ${passengerId}`);
      return true;
    }
    return false;
  }

  completeTrip(taxi) {
    if (taxi.hasPassenger && taxi.passengerMoney > 0) {
      this.state.money += taxi.passengerMoney;
      this.state.score += Math.round(taxi.passengerMoney);
      taxi.addEarnings(taxi.passengerMoney);
      taxi.triopsCompleted++;

      this.gameStats.totalTrips++;
      this.gameStats.totalEarnings += taxi.passengerMoney;

      this.logEvent(`Trip completed! Earned $${taxi.passengerMoney}`);
    }

    taxi.hasPassenger = false;
    taxi.passengerMoney = 0;
    taxi.isMoving = false;
    this.gameStats.currentTrips--;
  }

  buyTaxi() {
    const taxiCost = 3000;
    if (this.state.money >= taxiCost) {
      this.state.money -= taxiCost;
      const newTaxi = new Taxi(
        this.world.taxis.length,
        Math.random() * this.world.width,
        Math.random() * this.world.height
      );
      this.world.addTaxi(newTaxi);
      this.logEvent(`New taxi purchased! Fleet size: ${this.world.taxis.length}`);
      return true;
    }
    this.logEvent('Insufficient funds to purchase taxi');
    return false;
  }

  sellTaxi(taxiId) {
    const taxi = this.world.taxis.find(t => t.id === taxiId);
    if (taxi && !taxi.isMoving && !taxi.hasPassenger) {
      const salePrice = 2000;
      this.state.money += salePrice;
      this.world.removeTaxi(taxiId);
      this.logEvent(`Taxi ${taxiId} sold for $${salePrice}`);
      return true;
    }
    return false;
  }

  maintenanceTaxi(taxiId) {
    const taxi = this.world.taxis.find(t => t.id === taxiId);
    if (taxi) {
      if (this.state.money >= taxi.maintenanceCost) {
        this.state.money -= taxi.maintenanceCost;
        taxi.performMaintenance();
        this.logEvent(`Taxi ${taxiId} maintenance completed`);
        return true;
      }
    }
    return false;
  }

  refuelTaxi(taxiId, fuelAmount = 50) {
    const taxi = this.world.taxis.find(t => t.id === taxiId);
    if (taxi) {
      const refuelCost = fuelAmount * 0.5; // $0.50 per fuel unit
      if (this.state.money >= refuelCost) {
        this.state.money -= refuelCost;
        taxi.refuel(fuelAmount);
        this.logEvent(`Taxi ${taxiId} refueled`);
        return true;
      }
    }
    return false;
  }

  updateGameStats() {
    if (this.gameStats.totalTrips > 0) {
      this.gameStats.avgTripEarning = 
        this.gameStats.totalEarnings / this.gameStats.totalTrips;
    }

    // Check level up
    if (this.state.score > this.state.level * 5000) {
      this.state.level = Math.min(this.state.maxLevel, this.state.level + 1);
      this.logEvent(`Level up! Now level ${this.state.level}`);
      // Difficulty increases with level
    }
  }

  logEvent(message) {
    const timestamp = this.formatTime(this.state.gameTime);
    const event = `[${timestamp}] ${message}`;
    this.eventLog.push(event);
    
    // Keep only last 50 events
    if (this.eventLog.length > 50) {
      this.eventLog.shift();
    }
    
    console.log(event);
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  pauseGame() {
    this.state.isPaused = !this.state.isPaused;
    this.logEvent(this.state.isPaused ? 'Game paused' : 'Game resumed');
  }

  setTimeScale(scale) {
    this.state.timeScale = Math.max(0.1, Math.min(5, scale));
    this.logEvent(`Game speed set to ${this.state.timeScale}x`);
  }

  render() {
    // Rendering logic would go here
    // This depends on your specific rendering library/canvas setup
    if (typeof this.onRender === 'function') {
      this.onRender();
    }
  }

  getGameStatus() {
    return {
      money: this.state.money,
      score: this.state.score,
      level: this.state.level,
      gameTime: this.formatTime(this.state.gameTime),
      taxis: this.world.taxis.length,
      passengers: this.world.passengers.length,
      isPaused: this.state.isPaused,
      stats: this.gameStats,
      weather: this.world.weather,
      dayNight: this.world.dayNight,
      trafficLevel: this.world.trafficLevel.toFixed(1),
    };
  }

  resetGame() {
    this.state.reset();
    this.world = new GameWorld();
    this.gameStats = {
      totalTrips: 0,
      totalEarnings: 0,
      totalDistance: 0,
      currentTrips: 0,
      averageRating: 5.0,
      avgTripEarning: 0,
    };
    this.eventLog = [];
    this.logEvent('Game reset');
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    GameManager,
    GameState,
    GameWorld,
    Taxi,
    Passenger,
  };
}
