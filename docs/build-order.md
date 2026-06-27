# EcoTransit AI – Build Order & Dependencies

## Ordered Modules
1. Setup
2. Backend architecture
3. Database schemas
4. Seed data
5. Auth
6. Frontend layout
7. Maps integration (basic)
8. ML models (baseline)
9. Prediction APIs
10. Route optimization (basic)
11. Dashboard pages (core views)
12. Sustainability analytics
13. Reports
14. Chatbot
15. i18n
16. Deployment
17. Testing

## Dependencies
- Backend architecture → Setup
- Database schemas → Backend architecture
- Seed data → Database schemas
- Auth → Backend + Database schemas
- Frontend layout → Setup + Auth + Backend APIs
- Maps → Frontend + API keys
- ML models → Seed data + DB access
- Prediction APIs → ML models + Backend
- Route optimization → Maps + DB + Backend
- Dashboard pages → Frontend + Maps + Prediction APIs + Auth
- Sustainability analytics → DB + Prediction APIs
- Reports → Analytics + Dashboard
- Chatbot → Backend + Prediction APIs/ML
- i18n → Frontend + Reports
- Deployment → Setup + Backend + Frontend + Prediction APIs
- Testing → touches all modules

## MVP Modules (First Phase)
- Setup
- Backend architecture
- Database schemas
- Seed data
- Auth
- Frontend layout
- Maps integration (basic)
- ML models (simple baseline)
- Prediction APIs (serve baseline)
- Dashboard pages (map + predictions)
- Deployment (Vercel + Render)
- Testing (unit + basic integration)
