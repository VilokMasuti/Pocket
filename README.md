# Pocket Bank Dashboard

### Dashboard View

- **Current Balance Display**: Shows total balance with professional currency formatting ($12,500.00)
- **Balance Visibility Toggle**: Eye icon to show/hide sensitive balance information
- **Income/Expense Summary**: Visual breakdown with color-coded cards
- **Growth Indicator**: Monthly balance trend indicator (+2.5%)
- **Quick Actions Grid**: Shortcuts for common banking actions (Scan QR, Transfer, Pay Bills, Savings, Mobile, Cards)

### Transaction List

- **Complete Transaction History**: Each entry displays Date, Description, Amount, Category, and Type (Credit/Debit)
- **Smart Filtering**: shadcn/ui Tabs component to filter "All", "Income", or "Expenses"
- **Category Icons**: Context-specific icons for each transaction type (Coffee, Shopping, Utilities, etc.)
- **Scrollable List**: ScrollArea component for smooth scrolling with custom dark scrollbar
- **Empty State**: Graceful UI when no transactions match the filter

### Send Money Form

- **Recipient Name**: Text input with user icon and validation
- **Amount**: Number input with dollar prefix and available balance display
- **Date**: Date picker with calendar icon
- **Real-time Validation**:
  - Amount must be > $0
  - Cannot exceed current balance (shows "Insufficient Funds" error)
  - All fields required
- **Loading State**: 1.5-second processing simulation with spinner and disabled button (prevents double-click)
- **Success Feedback**: Animated Alert component after successful transfer
- **Instant Updates**: Balance and transaction list update without page refresh

### Header

- **Branding**: Logo with online status indicator
- **Notifications**: Bell icon with badge showing unread count
- **User Profile**: Avatar with dropdown menu (Profile, Settings, Logout)
- **Mobile Menu**: Hamburger menu for smaller screens

## Tech Stack

| Technology          | Purpose                                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------------ |
| **Next.js 15**      | React framework with App Router                                                                        |
| **TypeScript**      | Type-safe development                                                                                  |
| **Tailwind CSS v4** | Utility-first styling with custom dark theme                                                           |
| **shadcn/ui**       | High-quality UI components (Card, Button, Input, Tabs, ScrollArea, Alert, Avatar, DropdownMenu, Badge) |
| **Zustand**         | Lightweight state management with localStorage persistence                                             |
| **Lucide React**    | Beautiful, consistent icons                                                                            |

## Project Structure

```
├── app/
│   ├── globals.css          # Dark theme tokens, scrollbar styles
│   ├── layout.tsx           # Root layout with Inter font
│   └── page.tsx             # Main dashboard composition
├── components/
│   ├── balance-card.tsx     # Balance with toggle, income/expense summary
│   ├── dashboard-header.tsx # Header with notifications, profile dropdown
│   ├── quick-actions.tsx    # Quick action buttons grid
│   ├── transaction-list.tsx # Filterable, scrollable transaction list
│   └── transfer-form.tsx    # Validated transfer form with feedback
├── lib/
│   ├── format-currency.ts   # Intl.NumberFormat currency helper
│   ├── mock-data.ts         # Initial transactions and balance
│   ├── store.ts             # Zustand store with persist
│   ├── types.ts             # Transaction, FilterType interfaces
│   └── utils.ts             # cn() utility
└── README.md
```

## State Management

Zustand store with localStorage persistence handles all app state:

```typescript
interface BankState {
  balance: number;
  transactions: Transaction[];
  filter: FilterType; // "all" | "income" | "expenses"
  isTransferring: boolean;
  transferSuccess: boolean;
  setFilter: (filter: FilterType) => void;
  transfer: (recipient: string, amount: number, date: string) => Promise<void>;
  clearTransferSuccess: () => void;
}
```

## Validation Rules

1. **Recipient**: Cannot be empty
2. **Amount**: Must be a number > 0
3. **Amount**: Cannot exceed current balance
4. **Date**: Required field

## Responsive Design

- **Mobile-first**: Base styles for mobile, enhanced at `sm`, `lg` breakpoints
- **Adaptive Layout**: Stacked on mobile, 3-column grid on desktop
- **Sticky Form**: Transfer form stays visible while scrolling on desktop
- **Touch Targets**: Minimum 44px for all interactive elements

## Design System

### Color Palette (Dark Theme)

- **Background**: Deep slate (`oklch(0.08 0.01 250)`)
- **Card**: Elevated slate with transparency
- **Primary**: Cyan/Teal accent (`oklch(0.75 0.15 185)`)
- **Success**: Green for income (`oklch(0.7 0.18 150)`)
- **Destructive**: Red for expenses (`oklch(0.6 0.2 25)`)

### Visual Effects

- Gradient overlays on hero elements
- Subtle shadows with primary color tinting
- Smooth transitions and animations

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```
