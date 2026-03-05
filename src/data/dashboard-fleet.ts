export interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  type: 'Van' | 'Truck' | 'Car'
  plate: string
  driver: string
  location: string
  mileage: number
  fuelType: string
  consumption: number
  monthlyMaintCost: number
  status: 'Active' | 'Maintenance' | 'Inactive'
  alerts: string[]
  nextMaintenance: string
}

export const vehicles: Vehicle[] = [
  { id: '0014075', make: 'Mercedes-Benz', model: 'Sprinter 316 CDI', year: 2018, type: 'Van', plate: '1234 ABC', driver: 'Carlos Martinez', location: 'Madrid', mileage: 287000, fuelType: 'Diesel', consumption: 9.8, monthlyMaintCost: 3100, status: 'Active', alerts: ['Requires replacement', 'High incident rate'], nextMaintenance: '2024-12-15' },
  { id: '0014201', make: 'Iveco', model: 'Daily 35S14', year: 2020, type: 'Van', plate: '5678 DEF', driver: 'Ana Lopez', location: 'Barcelona', mileage: 145000, fuelType: 'Diesel', consumption: 8.5, monthlyMaintCost: 420, status: 'Active', alerts: [], nextMaintenance: '2024-12-18' },
  { id: '0014198', make: 'Renault', model: 'Master L2H2', year: 2017, type: 'Van', plate: '9012 GHI', driver: 'Miguel Torres', location: 'Valencia', mileage: 312000, fuelType: 'Diesel', consumption: 9.2, monthlyMaintCost: 890, status: 'Active', alerts: ['Renewal candidate'], nextMaintenance: '2024-12-20' },
  { id: '0015042', make: 'Mercedes-Benz', model: 'Actros 1845', year: 2021, type: 'Truck', plate: '3456 JKL', driver: 'Laura Sanchez', location: 'Sevilla', mileage: 198000, fuelType: 'Diesel', consumption: 28.5, monthlyMaintCost: 1250, status: 'Active', alerts: [], nextMaintenance: '2024-12-22' },
  { id: '0014889', make: 'MAN', model: 'TGX 18.440', year: 2019, type: 'Truck', plate: '7890 MNO', driver: 'David Ruiz', location: 'Madrid', mileage: 267000, fuelType: 'Diesel', consumption: 30.2, monthlyMaintCost: 980, status: 'Active', alerts: [], nextMaintenance: '2024-12-28' },
  { id: '0014801', make: 'BMW', model: '320d Touring', year: 2021, type: 'Car', plate: '4567 CDE', driver: 'Carmen Vega', location: 'Madrid', mileage: 89000, fuelType: 'Diesel', consumption: 5.2, monthlyMaintCost: 180, status: 'Active', alerts: [], nextMaintenance: '2025-02-15' },
  { id: '0014923', make: 'Audi', model: 'A4 Avant', year: 2020, type: 'Car', plate: '8901 FGH', driver: 'Roberto Sanchez', location: 'Barcelona', mileage: 112000, fuelType: 'Diesel', consumption: 5.8, monthlyMaintCost: 210, status: 'Active', alerts: [], nextMaintenance: '2025-01-20' },
  { id: '0014556', make: 'Volkswagen', model: 'Caddy', year: 2021, type: 'Van', plate: '2345 PQR', driver: 'Elena Garcia', location: 'Madrid', mileage: 98000, fuelType: 'Diesel', consumption: 6.8, monthlyMaintCost: 280, status: 'Active', alerts: [], nextMaintenance: '2025-01-10' },
  { id: '0014678', make: 'Ford', model: 'Transit Custom', year: 2020, type: 'Van', plate: '6789 STU', driver: 'Javier Moreno', location: 'Barcelona', mileage: 167000, fuelType: 'Diesel', consumption: 8.1, monthlyMaintCost: 350, status: 'Maintenance', alerts: [], nextMaintenance: '2025-01-12' },
  { id: '0014789', make: 'Peugeot', model: 'Boxer L3H2', year: 2019, type: 'Van', plate: '0123 VWX', driver: 'Alberto Fernandez', location: 'Valencia', mileage: 203000, fuelType: 'Diesel', consumption: 9.5, monthlyMaintCost: 420, status: 'Active', alerts: [], nextMaintenance: '2025-01-15' },
  { id: '0015123', make: 'Scania', model: 'R450', year: 2020, type: 'Truck', plate: '4567 YZA', driver: 'Pablo Ruiz', location: 'Zaragoza', mileage: 245000, fuelType: 'Diesel', consumption: 29.0, monthlyMaintCost: 1100, status: 'Active', alerts: [], nextMaintenance: '2025-02-01' },
  { id: '0014334', make: 'Citroen', model: 'Berlingo', year: 2022, type: 'Van', plate: '8901 BCD', driver: 'Maria Rodriguez', location: 'Madrid', mileage: 62000, fuelType: 'Diesel', consumption: 6.2, monthlyMaintCost: 150, status: 'Active', alerts: [], nextMaintenance: '2025-03-01' },
  { id: '0014445', make: 'Renault', model: 'Master L3H2', year: 2018, type: 'Van', plate: '2345 EFG', driver: 'Isabel Ramos', location: 'Zaragoza', mileage: 278000, fuelType: 'Diesel', consumption: 9.4, monthlyMaintCost: 750, status: 'Active', alerts: ['Renewal candidate'], nextMaintenance: '2025-01-05' },
  { id: '0014567', make: 'Iveco', model: 'Daily 35C14', year: 2019, type: 'Van', plate: '6789 HIJ', driver: 'Fernando Lopez', location: 'Sevilla', mileage: 189000, fuelType: 'Diesel', consumption: 8.9, monthlyMaintCost: 480, status: 'Maintenance', alerts: [], nextMaintenance: '2024-12-30' },
  { id: '0014890', make: 'Volkswagen', model: 'Transporter T6.1', year: 2021, type: 'Van', plate: '0123 KLM', driver: 'Alberto Fernandez', location: 'Valencia', mileage: 134000, fuelType: 'Diesel', consumption: 7.8, monthlyMaintCost: 320, status: 'Active', alerts: [], nextMaintenance: '2025-02-10' },
  { id: '0015234', make: 'DAF', model: 'XF 480', year: 2020, type: 'Truck', plate: '4567 NOP', driver: 'Carlos Jimenez', location: 'Barcelona', mileage: 312000, fuelType: 'Diesel', consumption: 27.5, monthlyMaintCost: 1050, status: 'Active', alerts: [], nextMaintenance: '2025-01-25' },
  { id: '0014112', make: 'Fiat', model: 'Ducato L2H2', year: 2020, type: 'Van', plate: '8901 QRS', driver: 'Sara Martinez', location: 'Madrid', mileage: 156000, fuelType: 'Diesel', consumption: 8.7, monthlyMaintCost: 380, status: 'Active', alerts: [], nextMaintenance: '2025-02-20' },
  { id: '0014223', make: 'Opel', model: 'Movano L3H2', year: 2019, type: 'Van', plate: '2345 TUV', driver: 'Antonio Garcia', location: 'Valencia', mileage: 198000, fuelType: 'Diesel', consumption: 9.1, monthlyMaintCost: 440, status: 'Inactive', alerts: [], nextMaintenance: '2025-03-15' },
  { id: '0015345', make: 'Volvo', model: 'FH16', year: 2021, type: 'Truck', plate: '6789 WXY', driver: 'Pedro Navarro', location: 'Madrid', mileage: 178000, fuelType: 'Diesel', consumption: 31.0, monthlyMaintCost: 1180, status: 'Active', alerts: [], nextMaintenance: '2025-02-05' },
  { id: '0014456', make: 'Nissan', model: 'NV400 L2H2', year: 2020, type: 'Van', plate: '0123 ZAB', driver: 'Luis Hernandez', location: 'Barcelona', mileage: 143000, fuelType: 'Diesel', consumption: 8.3, monthlyMaintCost: 360, status: 'Active', alerts: [], nextMaintenance: '2025-01-30' },
]

export const fleetKpis = {
  fleetSize: 850,
  active: 812,
  inMaintenance: 29,
  inactive: 9,
  deltaFleetSize: 2.4,
  deltaActive: 1.8,
  deltaMaintenance: -12.1,
  deltaInactive: 0,
}
