export interface Task {
  id: string;
  title: string;
  assignee: string;
  deadline: string;
  completed?: boolean;
  completionReason?: string;
  challenges?: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  agenda: string;
  updates: string;
  decisions: string;
  nextActions: string;
  blockers: string;
  tasks: Task[];
}

export const demoMeetings: Meeting[] = [
  {
    id: "1",
    title: "Sprint Planning - Sept 9",
    date: "2024-09-09",
    time: "10:00 AM",
    agenda: "Plan upcoming sprint tasks and review backlog items",
    updates: "Completed authentication module and database setup",
    decisions: "Decided to implement CI/CD pipeline before next release",
    nextActions: "Assign tasks for sprint, setup CI/CD, review login flow",
    blockers: "Waiting for API keys from third-party service",
    tasks: [
      {
        id: "t1",
        title: "Implement OAuth login with Google & GitHub",
        assignee: "Sarah",
        deadline: "2024-09-12",
      },
      {
        id: "t2", 
        title: "Finalize database schema and run migration scripts",
        assignee: "Mike",
        deadline: "2024-09-10",
      },
      {
        id: "t3",
        title: "Draft initial GitHub Actions pipeline for automated builds",
        assignee: "Alex",
        deadline: "2024-09-15",
      }
    ]
  },
  {
    id: "2",
    title: "Weekly Sync - Sept 16", 
    date: "2024-09-16",
    time: "2:00 PM",
    agenda: "Review progress and discuss upcoming milestones",
    updates: "Login system deployed, database optimizations complete",
    decisions: "Move mobile app development to next quarter",
    nextActions: "Focus on web app features, prepare for user testing",
    blockers: "Need design approval for new user dashboard",
    tasks: [
      {
        id: "t4",
        title: "Finalize high-fidelity designs for dashboard widgets",
        assignee: "Emma",
        deadline: "2024-09-18",
      },
      {
        id: "t5",
        title: "Write detailed API reference for authentication & user endpoints",
        assignee: "David", 
        deadline: "2024-09-20",
      },
      {
        id: "t6",
        title: "Run load testing with 500 concurrent users",
        assignee: "Lisa",
        deadline: "2024-09-22",
      }
    ]
  },
  {
    id: "3",
    title: "Product Review - Sept 23",
    date: "2024-09-23", 
    time: "11:30 AM",
    agenda: "Demonstrate completed features and gather stakeholder feedback",
    updates: "Dashboard implementation finished, user testing completed",
    decisions: "Approved go-live date for October 1st",
    nextActions: "Final bug fixes, deployment preparation, user training",
    blockers: "Server capacity planning needs confirmation",
    tasks: [
      {
        id: "t7",
        title: "Fix top 5 critical bugs reported in UAT",
        assignee: "Sarah",
        deadline: "2024-09-28",
      },
      {
        id: "t8",
        title: "Prepare Docker & Kubernetes deployment scripts",
        assignee: "Mike",
        deadline: "2024-09-30",
      },
      {
        id: "t9", 
        title: "Create step-by-step training deck for client onboarding",
        assignee: "Emma",
        deadline: "2024-09-29",
      }
    ]
  }
];
