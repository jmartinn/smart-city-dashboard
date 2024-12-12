# Smart City Energy Dashboard
![Home Page](https://github.com/user-attachments/assets/b446a6f0-290f-423b-813d-790744fea27a)

A comprehensive dashboard for monitoring and analyzing energy consumption, production, and emissions in smart cities. Empowering sustainable urban development through data-driven insights.

## 🚀 Features

- Real-time energy consumption monitoring
- Production analytics visualization
- Sector-wise energy distribution analysis
- Interactive data tables with pagination
- Date range filtering
- Responsive design
- Authentication system
- Dark/Light theme support

## 🛠️ Tech Stack

- **Framework**: Next.js 15.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Radix UI
- **Authentication**: NextAuth.js
- **Database**: Supabase
- **ORM**: Prisma
- **Testing**:
  - Jest for unit testing
  - Cypress for E2E testing
- **Charts**: Recharts
- **Form Handling**: React Hook Form
- **Data Validation**: Zod

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/jmartinn/technical-test.git
cd technical-test
```

2. Install dependencies:
```bash
pnpm install
```

3. Copy the example environment file:
```bash
cp .env.example .env
```

4. Set up your environment variables in `.env`

5. Initialize the database:
```bash
pnpm dlx prisma db push
# or
npx prisma db push
```

## 🚀 Development

Run the development server:
```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🧪 Testing

### Unit Tests
```bash
# Run tests
pnpm test

# Watch mode
pnpm run test:watch
```

### E2E Tests
```bash
# Open Cypress
pnpm run cypress:open
```

## 📁 Project Structure

```
├── app/
│   ├── (routes)/
│   │   └── (dashboard)/
│   └── api/
├── components/
│   ├── ui/
│   ├── wrappers/
│   └── skeletons/
├── config/
├── lib/
│   └── db/
├── prisma/
├── public/
└── types/
```

## 🏗️ Architecture

The project follows a modern Next.js architecture with the following key aspects:

1. **App Router**: Utilizes Next.js 15's app router for improved routing and layouts
2. **Server Components**: Leverages React Server Components for improved performance
3. **Component Architecture**:
   - UI components built with Radix UI primitives
   - Wrapper components for data fetching
   - Skeleton components for loading states
4. **Data Flow**:
   - Server-side data fetching with Prisma
   - Client-side state management with React hooks
   - Real-time updates where necessary

## 🔒 Authentication

The project uses NextAuth.js with Prisma adapter for authentication. Supported providers can be configured in the auth configuration.

## 🚀 Deployment

This project is deployed to [Vercel](https://vercel.com/). You can learn more at [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
