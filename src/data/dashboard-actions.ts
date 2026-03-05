export interface TaskStep {
  description: string
  assignee: string
  dueDate: string
  completed: boolean
}

export interface ActionTask {
  id: string
  title: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  status: 'open' | 'in-progress' | 'completed' | 'blocked'
  assignee: string
  dueDate: string
  expectedSavings: number
  insightId: string
  description: string
  steps: TaskStep[]
}

export const actionTasks: ActionTask[] = [
  {
    id: 'TSK-001',
    title: 'Urgent replacement vehicle 0014075',
    priority: 'critical',
    status: 'open',
    assignee: 'Roberto Sanchez',
    dueDate: '2024-12-20',
    expectedSavings: 3800,
    insightId: 'INS-001',
    description: '2018 Mercedes Sprinter with 29.2x average maintenance frequency needs immediate replacement.',
    steps: [
      { description: 'Request 3 quotes for equivalent Euro 6d-TEMP vehicle', assignee: 'Roberto Sanchez', dueDate: '2024-12-10', completed: false },
      { description: 'Approve budget and process order', assignee: 'Carmen Vega (CFO)', dueDate: '2024-12-13', completed: false },
      { description: 'Coordinate delivery and transfer of operation', assignee: 'Roberto Sanchez', dueDate: '2024-12-18', completed: false },
      { description: 'Manage deregistration and residual value recovery', assignee: 'Maria Jose Torres', dueDate: '2024-12-20', completed: false },
    ],
  },
  {
    id: 'TSK-002',
    title: 'Safe driving training - Carlos Martinez',
    priority: 'critical',
    status: 'in-progress',
    assignee: 'Isabel Ramos',
    dueDate: '2024-12-15',
    expectedSavings: 2400,
    insightId: 'INS-002',
    description: 'Driver shows harsh braking 340% above average on Madrid-Barcelona route.',
    steps: [
      { description: 'Meeting with Carlos to review telematics data', assignee: 'Isabel Ramos', dueDate: '2024-12-01', completed: true },
      { description: 'Enrollment in efficient driving course (CNAE Foundation)', assignee: 'Isabel Ramos', dueDate: '2024-12-05', completed: true },
      { description: 'Route accompaniment Madrid-Barcelona', assignee: 'Javier Moreno', dueDate: '2024-12-12', completed: false },
      { description: 'Improvement review after 2 weeks', assignee: 'Isabel Ramos', dueDate: '2024-12-22', completed: false },
    ],
  },
  {
    id: 'TSK-003',
    title: 'Technical audit Iveco Daily fleet',
    priority: 'critical',
    status: 'open',
    assignee: 'Roberto Sanchez',
    dueDate: '2025-01-10',
    expectedSavings: 127000,
    insightId: 'INS-003',
    description: '85 Iveco Daily with 67% unplanned maintenance vs 23% industry average.',
    steps: [
      { description: 'Compile breakdown history of 85 Iveco Daily', assignee: 'Roberto Sanchez', dueDate: '2024-12-20', completed: false },
      { description: 'Meeting with Iveco Spain technical team', assignee: 'Roberto Sanchez', dueDate: '2024-12-27', completed: false },
      { description: 'Negotiate extended warranty terms', assignee: 'Carmen Vega', dueDate: '2025-01-05', completed: false },
      { description: 'Update purchasing policy for future acquisitions', assignee: 'Roberto Sanchez', dueDate: '2025-01-10', completed: false },
    ],
  },
  {
    id: 'TSK-004',
    title: 'Workshop consolidation Valencia Region',
    priority: 'high',
    status: 'open',
    assignee: 'Roberto Sanchez',
    dueDate: '2025-01-15',
    expectedSavings: 18500,
    insightId: 'INS-004',
    description: '7 different workshops with rates varying up to 34%.',
    steps: [
      { description: 'Analyze volume distribution across 7 workshops', assignee: 'Roberto Sanchez', dueDate: '2024-12-20', completed: false },
      { description: 'Request proposals from top 3 workshops', assignee: 'Roberto Sanchez', dueDate: '2025-01-05', completed: false },
      { description: 'Negotiate rates (-10% target)', assignee: 'Carmen Vega', dueDate: '2025-01-10', completed: false },
      { description: 'Communicate new protocol to drivers', assignee: 'Isabel Ramos', dueDate: '2025-01-15', completed: false },
    ],
  },
  {
    id: 'TSK-005',
    title: 'Early renewal 23 Renault Master',
    priority: 'high',
    status: 'open',
    assignee: 'Carmen Vega',
    dueDate: '2025-02-28',
    expectedSavings: 34000,
    insightId: 'INS-005',
    description: '23 Renault Master 2017 exceeded optimal TCO. Maintenance = 42% of residual value.',
    steps: [
      { description: 'Calculate residual value for each vehicle', assignee: 'Carmen Vega', dueDate: '2025-01-10', completed: false },
      { description: 'Get quotes from 3 leasing providers', assignee: 'Carmen Vega', dueDate: '2025-01-20', completed: false },
      { description: 'Verify tax incentives (15% deduction)', assignee: 'Carmen Vega', dueDate: '2025-01-25', completed: false },
      { description: 'Approve renewal plan', assignee: 'Carmen Vega', dueDate: '2025-02-10', completed: false },
      { description: 'Staggered deliveries over 3 months', assignee: 'Roberto Sanchez', dueDate: '2025-02-28', completed: false },
    ],
  },
  {
    id: 'TSK-006',
    title: 'Switch to premium tires on long-distance fleet',
    priority: 'high',
    status: 'in-progress',
    assignee: 'Roberto Sanchez',
    dueDate: '2025-03-31',
    expectedSavings: 12800,
    insightId: 'INS-006',
    description: 'Michelin tires last 18% longer, 3.2% better efficiency on long routes.',
    steps: [
      { description: 'Negotiate Michelin framework contract', assignee: 'Roberto Sanchez', dueDate: '2024-12-15', completed: true },
      { description: 'Plan tire change schedule for 45 vehicles', assignee: 'Roberto Sanchez', dueDate: '2025-01-15', completed: false },
      { description: 'Set up KPI tracking (wear rate, fuel efficiency)', assignee: 'Roberto Sanchez', dueDate: '2025-02-01', completed: false },
      { description: 'Execute phased rollout', assignee: 'Roberto Sanchez', dueDate: '2025-03-31', completed: false },
    ],
  },
  {
    id: 'TSK-007',
    title: 'RFP insurance policy renewal',
    priority: 'high',
    status: 'in-progress',
    assignee: 'Carmen Vega',
    dueDate: '2024-12-15',
    expectedSavings: 42500,
    insightId: 'INS-007',
    description: 'Claims decreased 22% in 2024. Strong negotiating position.',
    steps: [
      { description: 'Prepare comprehensive claims report', assignee: 'Carmen Vega', dueDate: '2024-11-25', completed: true },
      { description: 'Send RFP to 5 insurers (MAPFRE, Allianz, AXA, Zurich, Liberty)', assignee: 'Carmen Vega', dueDate: '2024-12-01', completed: true },
      { description: 'Analyze and compare proposals', assignee: 'Carmen Vega', dueDate: '2024-12-10', completed: false },
      { description: 'Final decision and contract signing', assignee: 'Carmen Vega', dueDate: '2024-12-15', completed: false },
    ],
  },
  {
    id: 'TSK-008',
    title: 'Corporate fuel card usage campaign',
    priority: 'high',
    status: 'open',
    assignee: 'Isabel Ramos',
    dueDate: '2024-12-20',
    expectedSavings: 28200,
    insightId: 'INS-008',
    description: '67% refueling at commercial stations at 7.3% premium.',
    steps: [
      { description: 'Analysis of fuel card usage by driver', assignee: 'Isabel Ramos', dueDate: '2024-12-10', completed: false },
      { description: 'Training session on corporate card benefits', assignee: 'Isabel Ramos', dueDate: '2024-12-14', completed: false },
      { description: 'Set up automatic alerts for off-network refueling', assignee: 'Roberto Sanchez', dueDate: '2024-12-17', completed: false },
      { description: 'Compliance review after 30 days', assignee: 'Isabel Ramos', dueDate: '2025-01-20', completed: false },
    ],
  },
  {
    id: 'TSK-009',
    title: 'Move forward December ITV inspections',
    priority: 'medium',
    status: 'completed',
    assignee: 'Roberto Sanchez',
    dueDate: '2024-12-06',
    expectedSavings: 0,
    insightId: 'INS-010',
    description: '10 vehicles approaching ITV inspection deadline.',
    steps: [
      { description: 'Identify 10 vehicles requiring ITV', assignee: 'Roberto Sanchez', dueDate: '2024-12-02', completed: true },
      { description: 'Schedule appointments at 3 ITV stations', assignee: 'Roberto Sanchez', dueDate: '2024-12-03', completed: true },
      { description: 'Pre-inspection checklist for each vehicle', assignee: 'Roberto Sanchez', dueDate: '2024-12-04', completed: true },
      { description: 'Complete all inspections', assignee: 'Roberto Sanchez', dueDate: '2024-12-06', completed: true },
    ],
  },
  {
    id: 'TSK-010',
    title: 'Adjust air filter change protocol',
    priority: 'medium',
    status: 'open',
    assignee: 'Roberto Sanchez',
    dueDate: '2025-01-15',
    expectedSavings: 2100,
    insightId: 'INS-011',
    description: '34 vehicles changed air filters with <70% useful life remaining.',
    steps: [
      { description: 'Review current filter change protocol', assignee: 'Roberto Sanchez', dueDate: '2024-12-20', completed: false },
      { description: 'Training for workshop teams on optimal intervals', assignee: 'Roberto Sanchez', dueDate: '2025-01-05', completed: false },
      { description: 'Update maintenance checklist', assignee: 'Roberto Sanchez', dueDate: '2025-01-15', completed: false },
    ],
  },
  {
    id: 'TSK-011',
    title: 'Comprehensive driver training program',
    priority: 'medium',
    status: 'open',
    assignee: 'Isabel Ramos',
    dueDate: '2025-01-31',
    expectedSavings: 0,
    insightId: 'INS-014',
    description: 'Design training program leveraging best practices from top 5 drivers.',
    steps: [
      { description: 'Meeting with top 5 drivers to document best practices', assignee: 'Isabel Ramos', dueDate: '2024-12-20', completed: false },
      { description: 'Design training workshop curriculum', assignee: 'Isabel Ramos', dueDate: '2025-01-10', completed: false },
      { description: 'Session 1: Madrid region (35 drivers)', assignee: 'Isabel Ramos', dueDate: '2025-01-20', completed: false },
      { description: 'Session 2: Barcelona region (28 drivers)', assignee: 'Isabel Ramos', dueDate: '2025-01-31', completed: false },
    ],
  },
]

export const actionSummary = {
  total: 11,
  critical: 3,
  dueToday: 0,
  totalImpact: 271300,
}
