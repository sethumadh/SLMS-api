generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  ADMIN
  TEACHER
  APPLICANT
  WAITLISTED
  STUDENT
  ALUMNI
}

enum PaymentMethod {
  ONLINE
  SCHOOL
  NA
  // Add more methods as needed
}

enum PaymentStatus {
  PENDING
  PAID
  NODUES
}

enum PaymentType {
  MONTHLY
  TERM
}

model Student {
  id                Int                @id @default(autoincrement())
  role              Role               @default(APPLICANT)
  enrollments       Enrollment[]
  personalDetails   PersonalDetails?
  parentsDetails    ParentsDetails?
  emergencyContact  EmergencyContact?
  healthInformation HealthInformation?
  otherInformation  OtherInformation?
  subjectsChosen    String[]
  subjectRelated    String[]
  createdAt         DateTime           @default(now())
  updatedAt         DateTime           @updatedAt
}

model PersonalDetails {
  id        Int     @id @default(autoincrement())
  firstName String
  lastName  String
  DOB       String?
  gender    String
  email     String  @unique
  contact   String  @unique
  address   String
  suburb    String
  state     String
  country   String
  postcode  String
  image     String?
  student   Student @relation(fields: [studentId], references: [id], onDelete: Cascade)
  studentId Int     @unique

  @@index([email])
}

model ParentsDetails {
  id            Int     @id @default(autoincrement())
  fatherName    String
  motherName    String
  parentEmail   String
  parentContact String
  studentId     Int     @unique
  student       Student @relation(fields: [studentId], references: [id], onDelete: Cascade)
}

model EmergencyContact {
  id            Int     @id @default(autoincrement())
  contactPerson String
  contactNumber String
  relationship  String
  studentId     Int     @unique
  student       Student @relation(fields: [studentId], references: [id], onDelete: Cascade)
}

model HealthInformation {
  id                        Int     @id @default(autoincrement())
  medicareNumber            String? @default("Medicare Number not provided") // change to optional
  ambulanceMembershipNumber String?
  medicalCondition          String
  allergy                   String
  studentId                 Int     @unique
  student                   Student @relation(fields: [studentId], references: [id], onDelete: Cascade)
}

model OtherInformation {
  id          Int      @id @default(autoincrement())
  otherInfo   String   @default("No information provided")
  declaration String[]
  student     Student? @relation(fields: [studentId], references: [id], onDelete: Cascade)
  studentId   Int      @unique
}

model Subject {
  id          Int           @id @default(autoincrement())
  name        String        @unique
  isActive    Boolean       @default(true)
  termSubject TermSubject[]
}

model Term {
  id          Int           @id @default(autoincrement())
  isPublish   Boolean       @default(false)
  currentTerm Boolean       @default(false)
  name        String        @unique // e.g., Q1-2024
  startDate   DateTime // The start date of the term
  endDate     DateTime // The end date of the term, which would be startDate + 3 months
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
  termSubject TermSubject[]
}

model Level {
  id          Int           @id @default(autoincrement())
  isActive    Boolean       @default(true)
  name        String        @unique // e.g., Beginner, Intermediate, Advanced
  termSubject TermSubject[]
  // feedback    Feedback[]
}

model TermSubject {
  id         Int          @id @default(autoincrement())
  termId     Int
  subjectId  Int
  feeId      Int?
  term       Term         @relation(fields: [termId], references: [id],
  subject    Subject      @relation(fields: [subjectId], references: [id])
  level      Level[]
  fee        Fee?         @relation(fields: [feeId], references: [id])
  enrollment Enrollment[]

  @@unique([termId, subjectId])
}

model Enrollment {
  id                   Int          @id @default(autoincrement())
  studentId            Int
  termSubjectId        Int // Reference to a specific TermSubject
  dueDate              DateTime // Term end date or expiry date
  student              Student      @relation(fields: [studentId], references: [id], onDelete: Cascade)
  termSubject          TermSubject? @relation(fields: [termSubjectTermId, termSubjectSubjectId], references: [termId, subjectId])
  feePayment           FeePayment[]
  termSubjectTermId    Int?
  termSubjectSubjectId Int?

  @@unique([studentId, termSubjectId]) // Ensuring uniqueness for the combination
}

model Fee {
  id          Int           @id @default(autoincrement())
  amount      Int
  // dueDate is removed since it's calculated from Term's startDate
  paymentType PaymentType // Indicates if the fee is paid monthly or per term
  TermSubject TermSubject[]

  @@unique([amount, paymentType])
}

model FeePayment {
  id           Int           @id @default(autoincrement())
  enrollmentId Int
  dueDate      DateTime
  paidDate     DateTime? // Nullable, set when payment is made
  amount       Int
  dueAmount    Int // Amount still due (if any)
  status       PaymentStatus @default(NODUES)
  method       PaymentMethod @default(NA) // New field for payment method
  enrollment   Enrollment    @relation(fields: [enrollmentId], references: [id])
}

// model Feedback {
//   id        Int      @id @default(autoincrement())
//   feedback  String
//   studentId Int
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
//   Level     Level?   @relation(fields: [levelId], references: [id])
//   levelId   Int?
//   Student   Student  @relation(fields: [studentId], references: [id], onDelete: Cascade)
// }
