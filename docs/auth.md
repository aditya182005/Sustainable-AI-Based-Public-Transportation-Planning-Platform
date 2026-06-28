
---

## 📜 Route List
- `POST /api/auth/signup` → create new user  
- `POST /api/auth/login` → authenticate user, return JWT  
- `GET /api/auth/me` → get current user (requires JWT)  

---

## 🧩 Model Fields (`user.model.ts`)
- `name: string`  
- `email: string` (unique)  
- `passwordHash: string`  
- `role: "admin" | "user"`  
- `preferredLanguage: "en" | "te" | "hi"`  
- `createdAt: Date`  
- `updatedAt: Date`  

---

## 🛡️ Middleware List
- **auth.middleware.ts** → verifies JWT, attaches `req.user`  
- **role.middleware.ts** → checks if user has required role  
- **error.middleware.ts** → global error handler (already exists)  
- **notFound.middleware.ts** → 404 handler (already exists)  
