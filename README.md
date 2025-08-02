# React Vite Tailwind Starter

This is a starter template for building modern web applications using React, Vite, and Tailwind CSS. It comes pre-configured with a variety of tools and libraries to accelerate your development process.

## ✨ Features

- **Frameworks and Libraries:**
    - [React](https://reactjs.org/)
    - [Vite](https://vitejs.dev/)
    - [Tailwind CSS](https://tailwindcss.com/)
- **Routing:**
    - [React Router DOM](https://reactrouter.com/)
- **State Management:**
    - [Tanstack Query](https://tanstack.com/query/v5)
- **Forms:**
    - [React Hook Form](https://react-hook-form.com/)
    - [Zod](https://zod.dev/) for validation
- **Internationalization:**
    - [i18next](https://www.i18next.com/)
- **UI Components:**
    - [shadcn/ui](httpss://ui.shadcn.com/) (via manual setup)
    - [Sonner](https://sonner.emilkowal.ski/) for notifications
    - [Lucide React](https://lucide.dev/guide/packages/lucide-react) for icons
- **Styling:**
    - [clsx](https://github.com/lukeed/clsx)
    - [tailwind-merge](https://github.com/dcastil/tailwind-merge)
- **Linting and Formatting:**
    - [Biome](https://biomejs.dev/)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v20.12.1 or higher)
- [pnpm](https://pnpm.io/) (v9.11.0 or higher)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/jhosep98/react-vite-tailwind-starter.git
    cd react-vite-tailwind-starter
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

### Development

To start the development server, run:

```bash
pnpm dev
```

This will start the Vite development server and open the application in your default browser.

## scripts

- `pnpm dev`: Starts the development server.
- `pnpm build`: Builds the application for production.
- `pnpm preview`: Previews the production build locally.
- `pnpm format`: Formats the code using Biome.
- `pnpm lint`: Lints the code using Biome.
- `pnpm check`: Runs all Biome checks.
- `pnpm typecheck`: Checks for TypeScript errors.

## Project Structure

```
/
├── public/         # Static assets
├── src/            # Source code
│   ├── assets/       # Fonts, icons, images
│   ├── components/   # Reusable components
│   ├── hooks/        # Custom hooks
│   ├── lib/          # Utility functions
│   ├── pages/        # Page components
│   ├── routes/       # Routing configuration
│   ├── services/     # API services
│   ├── store/        # State management
│   └── styles/       # Global styles
├── .gitignore      # Git ignore file
├── biome.json      # Biome configuration
├── index.html      # HTML entry point
├── package.json    # Project metadata and dependencies
├── pnpm-lock.yaml  # PNPM lock file
├── README.md       # Project README
├── tsconfig.json   # TypeScript configuration
└── vite.config.ts  # Vite configuration
```

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.