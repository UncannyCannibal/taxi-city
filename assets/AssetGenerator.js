/**
 * AssetGenerator.js
 * Generates SVG assets for Taxi City game
 * Includes taxi sprites, passengers, buildings, traffic cars, fuel stations, checkpoints, and UI buttons
 */

class AssetGenerator {
  /**
   * Generate a taxi sprite SVG
   * @param {string} color - Taxi color (yellow, blue, green, red)
   * @param {number} size - Size of sprite (default 64)
   * @returns {string} SVG string
   */
  static generateTaxiSprite(color = 'yellow', size = 64) {
    const colors = {
      yellow: { body: '#FFD700', stripe: '#FFA500' },
      blue: { body: '#4169E1', stripe: '#1E90FF' },
      green: { body: '#32CD32', stripe: '#228B22' },
      red: { body: '#FF4500', stripe: '#DC143C' }
    };

    const c = colors[color] || colors.yellow;
    const unit = size / 64;

    return `
      <svg width="${size}" height="${size}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <!-- Body -->
        <rect x="12" y="24" width="40" height="24" rx="4" fill="${c.body}" stroke="#000" stroke-width="1"/>
        
        <!-- Cabin -->
        <polygon points="16,16 24,24 40,24 48,16" fill="${c.body}" stroke="#000" stroke-width="1"/>
        
        <!-- Windshield -->
        <polygon points="18,18 22,24 42,24 46,18" fill="#87CEEB" stroke="#000" stroke-width="0.5"/>
        
        <!-- Stripe -->
        <rect x="20" y="30" width="24" height="2" fill="${c.stripe}"/>
        
        <!-- Left wheel -->
        <circle cx="20" cy="48" r="6" fill="#333" stroke="#000" stroke-width="1"/>
        <circle cx="20" cy="48" r="3" fill="#666"/>
        
        <!-- Right wheel -->
        <circle cx="44" cy="48" r="6" fill="#333" stroke="#000" stroke-width="1"/>
        <circle cx="44" cy="48" r="3" fill="#666"/>
        
        <!-- Taxi light on roof -->
        <rect x="28" y="12" width="8" height="4" rx="1" fill="#FFD700" stroke="#000" stroke-width="0.5"/>
      </svg>
    `;
  }

  /**
   * Generate a passenger sprite SVG
   * @param {string} skin - Skin tone (light, medium, dark)
   * @param {number} size - Size of sprite (default 48)
   * @returns {string} SVG string
   */
  static generatePassengerSprite(skin = 'medium', size = 48) {
    const skins = {
      light: { body: '#FDBCB4', face: '#F4A460' },
      medium: { body: '#D2B48C', face: '#CD853F' },
      dark: { body: '#8B7355', face: '#654321' }
    };

    const s = skins[skin] || skins.medium;
    const unit = size / 48;

    return `
      <svg width="${size}" height="${size}" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <!-- Head -->
        <circle cx="24" cy="12" r="8" fill="${s.face}" stroke="#000" stroke-width="1"/>
        
        <!-- Hair -->
        <path d="M 16 12 A 8 8 0 0 1 32 12 L 32 8 A 8 6 0 0 1 16 8 Z" fill="#4A4A4A" stroke="#000" stroke-width="1"/>
        
        <!-- Eyes -->
        <circle cx="20" cy="10" r="1.5" fill="#000"/>
        <circle cx="28" cy="10" r="1.5" fill="#000"/>
        
        <!-- Smile -->
        <path d="M 20 13 Q 24 15 28 13" stroke="#000" stroke-width="1" fill="none"/>
        
        <!-- Body -->
        <ellipse cx="24" cy="28" rx="10" ry="14" fill="${s.body}" stroke="#000" stroke-width="1"/>
        
        <!-- Arms -->
        <rect x="8" y="22" width="6" height="16" rx="3" fill="${s.face}" stroke="#000" stroke-width="1"/>
        <rect x="34" y="22" width="6" height="16" rx="3" fill="${s.face}" stroke="#000" stroke-width="1"/>
        
        <!-- Legs -->
        <rect x="19" y="40" width="5" height="8" fill="#333" stroke="#000" stroke-width="1"/>
        <rect x="24" y="40" width="5" height="8" fill="#333" stroke="#000" stroke-width="1"/>
        
        <!-- Shoes -->
        <ellipse cx="21.5" cy="48" rx="2.5" ry="1.5" fill="#000"/>
        <ellipse cx="26.5" cy="48" rx="2.5" ry="1.5" fill="#000"/>
      </svg>
    `;
  }

  /**
   * Generate a building sprite SVG
   * @param {string} type - Building type (office, residential, shop)
   * @param {number} size - Size of sprite (default 80)
   * @returns {string} SVG string
   */
  static generateBuildingSprite(type = 'office', size = 80) {
    const buildingTypes = {
      office: {
        color: '#A9A9A9',
        accent: '#696969',
        windows: '#87CEEB'
      },
      residential: {
        color: '#CD5C5C',
        accent: '#8B3A3A',
        windows: '#FFE4B5'
      },
      shop: {
        color: '#FF69B4',
        accent: '#C71585',
        windows: '#FFD700'
      }
    };

    const b = buildingTypes[type] || buildingTypes.office;

    return `
      <svg width="${size}" height="${size}" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <!-- Base -->
        <rect x="10" y="15" width="60" height="55" fill="${b.color}" stroke="#000" stroke-width="2"/>
        
        <!-- Roof -->
        <polygon points="10,15 40,5 70,15" fill="${b.accent}" stroke="#000" stroke-width="2"/>
        
        <!-- Door -->
        <rect x="35" y="55" width="10" height="15" fill="#8B4513" stroke="#000" stroke-width="1"/>
        <circle cx="44" cy="62" r="1" fill="#FFD700"/>
        
        <!-- Windows -->
        <rect x="18" y="25" width="8" height="8" fill="${b.windows}" stroke="#000" stroke-width="1"/>
        <rect x="32" y="25" width="8" height="8" fill="${b.windows}" stroke="#000" stroke-width="1"/>
        <rect x="46" y="25" width="8" height="8" fill="${b.windows}" stroke="#000" stroke-width="1"/>
        <rect x="60" y="25" width="8" height="8" fill="${b.windows}" stroke="#000" stroke-width="1"/>
        
        <rect x="18" y="40" width="8" height="8" fill="${b.windows}" stroke="#000" stroke-width="1"/>
        <rect x="32" y="40" width="8" height="8" fill="${b.windows}" stroke="#000" stroke-width="1"/>
        <rect x="46" y="40" width="8" height="8" fill="${b.windows}" stroke="#000" stroke-width="1"/>
        <rect x="60" y="40" width="8" height="8" fill="${b.windows}" stroke="#000" stroke-width="1"/>
        
        <!-- Flag/sign -->
        <rect x="68" y="8" width="2" height="8" fill="#8B4513"/>
        <polygon points="70,8 70,12 74,10" fill="${b.accent}"/>
      </svg>
    `;
  }

  /**
   * Generate a traffic car sprite SVG
   * @param {string} carType - Car type (sedan, suv, sports)
   * @param {number} size - Size of sprite (default 56)
   * @returns {string} SVG string
   */
  static generateTrafficCarSprite(carType = 'sedan', size = 56) {
    const carTypes = {
      sedan: {
        body: '#DC143C',
        length: 40,
        cabin: 'polygon',
        width: 18
      },
      suv: {
        body: '#000080',
        length: 42,
        cabin: 'rect',
        width: 20
      },
      sports: {
        body: '#FF1493',
        length: 38,
        cabin: 'polygon',
        width: 16
      }
    };

    const car = carTypes[carType] || carTypes.sedan;

    return `
      <svg width="${size}" height="${size}" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
        <!-- Body -->
        <rect x="8" y="22" width="${car.length}" height="${car.width}" rx="3" fill="${car.body}" stroke="#000" stroke-width="1"/>
        
        <!-- Cabin -->
        <polygon points="14,14 22,22 34,22 42,14" fill="${car.body}" stroke="#000" stroke-width="1"/>
        
        <!-- Windows -->
        <polygon points="16,16 20,22 32,22 38,16" fill="#87CEEB" stroke="#000" stroke-width="0.5"/>
        
        <!-- Left wheel -->
        <circle cx="16" cy="38" r="5" fill="#333" stroke="#000" stroke-width="1"/>
        <circle cx="16" cy="38" r="2.5" fill="#666"/>
        
        <!-- Right wheel -->
        <circle cx="40" cy="38" r="5" fill="#333" stroke="#000" stroke-width="1"/>
        <circle cx="40" cy="38" r="2.5" fill="#666"/>
        
        <!-- Headlights -->
        <circle cx="10" cy="28" r="2" fill="#FFFF00" stroke="#000" stroke-width="0.5"/>
        <circle cx="10" cy="32" r="2" fill="#FFFF00" stroke="#000" stroke-width="0.5"/>
      </svg>
    `;
  }

  /**
   * Generate a fuel station sprite SVG
   * @param {number} size - Size of sprite (default 96)
   * @returns {string} SVG string
   */
  static generateFuelStationSprite(size = 96) {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
        <!-- Ground -->
        <rect x="15" y="60" width="66" height="30" fill="#8B7355" stroke="#000" stroke-width="2"/>
        
        <!-- Pump support -->
        <rect x="20" y="40" width="8" height="20" fill="#696969" stroke="#000" stroke-width="1"/>
        <rect x="68" y="40" width="8" height="20" fill="#696969" stroke="#000" stroke-width="1"/>
        
        <!-- Canopy -->
        <rect x="15" y="20" width="66" height="20" fill="#FF4500" stroke="#000" stroke-width="2"/>
        
        <!-- Canopy support poles -->
        <rect x="22" y="35" width="4" height="5" fill="#696969"/>
        <rect x="70" y="35" width="4" height="5" fill="#696969"/>
        
        <!-- Left pump -->
        <rect x="12" y="45" width="12" height="20" fill="#333" stroke="#000" stroke-width="1"/>
        <rect x="14" y="48" width="8" height="3" fill="#FFD700"/>
        <circle cx="18" cy="55" r="3" fill="#FF6347"/>
        <text x="18" y="62" text-anchor="middle" font-size="6" fill="#FFF">$</text>
        
        <!-- Right pump -->
        <rect x="72" y="45" width="12" height="20" fill="#333" stroke="#000" stroke-width="1"/>
        <rect x="74" y="48" width="8" height="3" fill="#FFD700"/>
        <circle cx="78" cy="55" r="3" fill="#FF6347"/>
        <text x="78" y="62" text-anchor="middle" font-size="6" fill="#FFF">$</text>
        
        <!-- Sign -->
        <rect x="38" y="8" width="20" height="12" fill="#FFD700" stroke="#000" stroke-width="1"/>
        <text x="48" y="16" text-anchor="middle" font-size="8" font-weight="bold" fill="#000">FUEL</text>
      </svg>
    `;
  }

  /**
   * Generate a checkpoint sprite SVG
   * @param {number} size - Size of sprite (default 72)
   * @returns {string} SVG string
   */
  static generateCheckpointSprite(size = 72) {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
        <!-- Base stand -->
        <rect x="20" y="50" width="32" height="20" fill="#8B4513" stroke="#000" stroke-width="1"/>
        
        <!-- Pole -->
        <rect x="33" y="15" width="6" height="35" fill="#696969" stroke="#000" stroke-width="1"/>
        
        <!-- Flag banner -->
        <rect x="39" y="18" width="20" height="12" fill="#FFD700" stroke="#000" stroke-width="2"/>
        
        <!-- Checkered pattern -->
        <rect x="40" y="19" width="4" height="5" fill="#000"/>
        <rect x="48" y="19" width="4" height="5" fill="#000"/>
        <rect x="56" y="19" width="4" height="5" fill="#000"/>
        
        <rect x="44" y="24" width="4" height="5" fill="#000"/>
        <rect x="52" y="24" width="4" height="5" fill="#000"/>
        <rect x="60" y="24" width="4" height="5" fill="#000"/>
        
        <!-- Flag number/marker -->
        <circle cx="48" cy="36" r="8" fill="#FF4500" stroke="#000" stroke-width="1"/>
        <text x="48" y="40" text-anchor="middle" font-size="12" font-weight="bold" fill="#FFF">!!</text>
        
        <!-- Light on top -->
        <circle cx="36" cy="14" r="3" fill="#00FF00" stroke="#000" stroke-width="0.5"/>
      </svg>
    `;
  }

  /**
   * Generate a UI button sprite SVG
   * @param {string} label - Button label text
   * @param {string} buttonType - Button type (primary, secondary, success, danger)
   * @param {number} width - Button width (default 120)
   * @param {number} height - Button height (default 40)
   * @returns {string} SVG string
   */
  static generateUIButton(label = 'Button', buttonType = 'primary', width = 120, height = 40) {
    const buttonStyles = {
      primary: {
        bg: '#4169E1',
        text: '#FFF',
        border: '#1E90FF'
      },
      secondary: {
        bg: '#696969',
        text: '#FFF',
        border: '#A9A9A9'
      },
      success: {
        bg: '#32CD32',
        text: '#000',
        border: '#228B22'
      },
      danger: {
        bg: '#FF4500',
        text: '#FFF',
        border: '#DC143C'
      }
    };

    const style = buttonStyles[buttonType] || buttonStyles.primary;

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
        <!-- Button background -->
        <rect x="2" y="2" width="116" height="36" rx="4" fill="${style.bg}" stroke="${style.border}" stroke-width="2"/>
        
        <!-- Shine effect -->
        <ellipse cx="30" cy="10" rx="25" ry="8" fill="#FFF" opacity="0.3"/>
        
        <!-- Text -->
        <text x="60" y="26" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="${style.text}">${label}</text>
      </svg>
    `;
  }

  /**
   * Generate all assets and return as object
   * @returns {object} Object containing all generated SVG assets
   */
  static generateAllAssets() {
    return {
      taxis: {
        yellow: this.generateTaxiSprite('yellow'),
        blue: this.generateTaxiSprite('blue'),
        green: this.generateTaxiSprite('green'),
        red: this.generateTaxiSprite('red')
      },
      passengers: {
        light: this.generatePassengerSprite('light'),
        medium: this.generatePassengerSprite('medium'),
        dark: this.generatePassengerSprite('dark')
      },
      buildings: {
        office: this.generateBuildingSprite('office'),
        residential: this.generateBuildingSprite('residential'),
        shop: this.generateBuildingSprite('shop')
      },
      trafficCars: {
        sedan: this.generateTrafficCarSprite('sedan'),
        suv: this.generateTrafficCarSprite('suv'),
        sports: this.generateTrafficCarSprite('sports')
      },
      fuelStation: this.generateFuelStationSprite(),
      checkpoint: this.generateCheckpointSprite(),
      buttons: {
        primary: this.generateUIButton('Start', 'primary'),
        secondary: this.generateUIButton('Cancel', 'secondary'),
        success: this.generateUIButton('Accept', 'success'),
        danger: this.generateUIButton('Decline', 'danger')
      }
    };
  }

  /**
   * Export asset as PNG using canvas (requires canvas library)
   * @param {string} svgString - SVG string to convert
   * @param {number} scale - Scale factor for output size
   * @returns {canvas.Canvas} Canvas object
   */
  static svgToCanvas(svgString, scale = 1) {
    if (typeof document === 'undefined') {
      console.warn('Canvas export requires DOM environment');
      return null;
    }

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
    const svg = svgDoc.documentElement;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const width = parseInt(svg.getAttribute('width')) * scale;
    const height = parseInt(svg.getAttribute('height')) * scale;

    canvas.width = width;
    canvas.height = height;

    const img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0, width, height);
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgString);

    return canvas;
  }
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AssetGenerator;
}
