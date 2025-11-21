# IoTendra - Smart Home IoT Management System

IoTendra is a comprehensive IoT device management system for smart homes, built with .NET 8 and Angular.

## Features

- **Smart Home Control**: Manage various IoT devices like lighting, security, heating, cameras, and sensors
- **Modern UI**: Beautiful and responsive Angular frontend with modern design
- **Real-time Monitoring**: Monitor sensor readings and device status in real-time
- **User Authentication**: Secure JWT-based authentication system
- **Clean Architecture**: Well-structured backend following Clean Architecture principles

## Technology Stack

### Backend
- **.NET 8**: Latest version of .NET for high performance
- **ASP.NET Core Web API**: RESTful API development
- **Entity Framework Core**: ORM for database operations
- **SQLite**: Lightweight database for development
- **JWT Authentication**: Secure token-based authentication
- **Clean Architecture**: Domain, Application, Infrastructure, and API layers

### Frontend
- **Angular 18**: Modern frontend framework
- **TypeScript**: Type-safe JavaScript development
- **Responsive Design**: Mobile-first responsive UI
- **Modern CSS**: Beautiful gradients and animations

## Project Structure

```
IoTendra/
├── IoTendra.Api/              # Web API layer
├── IoTendra.Application/      # Application business logic
├── IoTendra.Domain/           # Domain entities and models
├── IoTendra.Infrastructure/   # Data access and external services
└── iotendraweb/              # Angular frontend application
```

## Getting Started

### Prerequisites
- .NET 8 SDK
- Node.js (v18 or later)
- Angular CLI

### Backend Setup
1. Navigate to the API project:
   ```bash
   cd IoTendra.Api
   ```

2. Restore packages:
   ```bash
   dotnet restore
   ```

3. Run the API:
   ```bash
   dotnet run
   ```

The API will be available at `http://localhost:5029`

### Frontend Setup
1. Navigate to the Angular project:
   ```bash
   cd iotendraweb
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

The frontend will be available at `http://localhost:55597`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Sensors
- `GET /api/sensors` - Get all sensors
- `POST /api/sensors` - Create new sensor
- `PUT /api/sensors/{id}` - Update sensor
- `DELETE /api/sensors/{id}` - Delete sensor

## Features Overview

### Smart Home Dashboard
- Interactive sensor cards with real-time status
- Toggle switches for device control
- Color-coded status indicators
- Modern card-based layout

### Supported Devices
- **Lighting**: Smart bulbs and switches
- **Security**: Alarm systems and door locks
- **Heating**: Thermostats and HVAC control
- **Hot Water**: Water heater management
- **Temperature**: Environmental monitoring
- **Camera**: Security camera systems
- **Motion Sensors**: Movement detection
- **Smart Plugs**: Remote outlet control
- **Smoke Detectors**: Fire safety monitoring

### User Experience
- Clean and intuitive interface
- Responsive design for all devices
- Real-time status updates
- Easy device management

## Development

### Database Migrations
```bash
cd IoTendra.Api
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### Building for Production
```bash
# Backend
dotnet publish -c Release

# Frontend
cd iotendraweb
ng build --prod
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions and support, please open an issue on GitHub.