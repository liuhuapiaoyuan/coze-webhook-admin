# 🚀 COZE Admin Dashboard

Welcome to the **COZE Admin Dashboard**, a powerful management system designed to help you easily manage **Coze Webhook** services, API endpoints, API keys, and related call logs. Whether you're a developer or an administrator, the COZE Admin Dashboard provides an efficient and user-friendly management experience.

## 🌟 Project Overview

The COZE Admin Dashboard is a modern management system built with **Next.js 15**, **React 19**, **TypeScript**, and **Prisma**. It offers a rich set of features, including:

- **Webhook Management**: Create, edit, and delete Webhooks, and monitor their call status.
- **API Endpoint Management**: Manage API endpoints, supporting both OpenAI-compatible and standard request types.
- **API Key Management**: Generate and manage API keys to control access to API endpoints.
- **Call Logs**: Record and view detailed API call logs, including request parameters, response results, and call duration.
- **Admin and Permission Management**: Manage admin accounts, roles, and permissions to ensure system security.

## 🛠️ Tech Stack

- **Frontend Framework**: [Next.js 15](https://nextjs.org/)
- **UI Component Library**: [Shadcn UI](https://ui.shadcn.com/) and [Radix UI](https://www.radix-ui.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: Built-in React 19 state management
- **Database**: [Prisma](https://www.prisma.io/) and SQLite
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **API Routing**: Next.js API routes
- **Tools**: [Vercel AI SDK](https://vercel.com/docs/ai-sdk) for AI integration

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/coze-webhook-admin.git
cd coze-webhook-admin
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Copy the `.env.template` file and rename it to `.env`, then modify the environment variables according to your needs.

```bash
cp .env.template .env
```

### 4. Database Migration

Use Prisma for database migration:

```bash
pnpm db:migrate
```

### 5. Start the Development Server

```bash
pnpm dev
```

### 6. Build the Project

```bash
pnpm build
```

### 7. Start the Production Server

```bash
pnpm start
```

## 📂 Project Structure

```plaintext
coze-webhook-admin/
├── docker/                  # Docker-related configurations
├── prisma/                  # Prisma database models and migrations
├── src/
│   ├── app/                 # Next.js pages and routes
│   ├── components/          # Reusable UI components
│   ├── hooks/               # Custom React Hooks
│   ├── lib/                 # Utility functions and libraries
│   ├── service/             # Business logic service layer
│   └── styles/              # Global styles
├── .env.template            # Environment variable template
├── .gitignore               # Git ignore file
├── package.json             # Project dependencies and scripts
├── prisma/schema.prisma     # Prisma database models
└── README.md                # Project documentation
```

## 📝 Features

### 1. **Webhook Management**

- Create, edit, and delete Webhooks.
- Monitor Webhook call status and logs.

### 2. **API Endpoint Management**

- Supports both OpenAI-compatible and standard request types.
- Manage API endpoint access permissions and keys.

### 3. **API Key Management**

- Generate and manage API keys.
- Control access to API endpoints.

### 4. **Call Logs**

- Record and view detailed API call logs.
- Includes request parameters, response results, and call duration.

### 5. **Admin and Permission Management**

- Manage admin accounts, roles, and permissions.
- Ensure system security and access control.

## 🛡️ Security

- **Authentication and Authorization**: Uses NextAuth.js for user authentication and authorization management.
- **API Keys**: All API calls require a valid API key.
- **Logging**: All API calls are logged for auditing and troubleshooting purposes.

## 🤝 Contributing

We welcome contributions of any kind! If you have any suggestions or find any issues, feel free to submit an Issue or Pull Request.

1. **Fork the Project**: First, fork this project to your GitHub account.
2. **Create a Branch**: Create a new branch for your feature or fix.
3. **Commit Changes**: Commit your changes and push them to your branch.
4. **Submit a Pull Request**: Create a Pull Request, describing your changes.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🙏 Acknowledgments

Thanks to all the developers who contributed to this project! Special thanks to the following open-source projects:

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)

---

We hope you enjoy using the **COZE Admin Dashboard**! If you have any questions or suggestions, please feel free to contact us. 😊

---

## 📖 中文文档

如果您需要查看中文文档，请点击 [这里](./README_CN.md)。

---

**Note**: The Chinese documentation is available [here](./README_CN.md).
