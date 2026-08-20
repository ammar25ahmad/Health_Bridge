# HealthBridge Database Schema

## Collections

### users
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| _id | ObjectId | auto | |
| name | String | yes | max 100 chars |
| email | String | yes | unique, lowercase |
| password | String | yes | bcrypt hashed, select: false |
| role | String | yes | CITIZEN, ORGANIZATION, ADMIN |
| organization | String | no | org name |
| createdAt | Date | auto | |
| updatedAt | Date | auto | |

### resources
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| _id | ObjectId | auto | |
| name | String | yes | |
| category | String | yes | enum: Clinics, Vaccination Centers, Emergency Contacts, Mental Wellness, Preventive Care, Public Health Programs |
| description | String | yes | |
| location | String | no | |
| contactInformation | String | no | |
| availability | String | no | e.g., "Mon-Fri 8AM-5PM" |
| status | String | default: PENDING | PENDING, APPROVED, REJECTED, ACTIVE, INACTIVE |
| createdBy | ObjectId | yes | ref: User |
| organization | String | no | creator org name |
| analysis | Object | no | Python analysis result |
| createdAt | Date | auto | |
| updatedAt | Date | auto | |

### articles
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| _id | ObjectId | auto | |
| title | String | yes | |
| category | String | yes | enum: Nutrition, Hygiene, Vaccination, First Aid, Preventive Care, Healthy Lifestyle |
| summary | String | no | |
| content | String | yes | |
| author | String | default: HealthBridge | |
| status | String | default: PUBLISHED | DRAFT, PUBLISHED |
| createdAt | Date | auto | |
| updatedAt | Date | auto | |

### questions
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| _id | ObjectId | auto | |
| text | String | yes | |
| userId | ObjectId | yes | ref: User |
| answer | String | no | |
| sources | [String] | no | |
| status | String | default: PENDING | PENDING, ANSWERED |
| createdAt | Date | auto | |
| updatedAt | Date | auto | |

## Indexes
- users: unique index on email
- resources: text index on name+description, compound index on category+status
- articles: text index on title+content
