const schema = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model calendar {
  ukey          Int             @id @default(autoincrement())
  name          String          @db.VarChar
  created_at    DateTime        @defaault(now()) @db.Timestamp(0)
  updated_at    DateTime        @default(now()) @db.Timestamp(0)
  start_at      BigInt?
  stop_at       BigInt?
  no_work_shift no_work_shift[]
  resource      resource[]
  work_shift    work_shift[]
}

model company {
  ukey               Int           @id @default(autoincrement())
  name               String        @db.VarChar
  company_group_ukey Int
  country            String?       @db.VarChar
  state              String?       @db.VarChar
  city               String?       @db.VarChar
  zip_code           String?       @db.VarChar
  street             String?       @db.VarChar
  number             String?       @db.VarChar
  complement         String?       @db.VarChar
  email              String?       @db.VarChar
  name_contact       String?       @db.VarChar
  register_type      String?       @db.VarChar
  register_number    String?       @db.VarChar
  created_at         DateTime      @default(now()) @db.Timestamp(0)
  updated_at         DateTime      @default(now()) @db.Timestamp(0)
  currency_used      String?       @db.Char(2)
  currency_ukey      Int?
  company_group      company_group @relation(fields: [company_group_ukey], references: [ukey])
  currency           currency?     @relation(fields: [currency_ukey], references: [ukey])
  sector             sector[]
  users              users[]
}

model company_group {
  ukey       Int       @id @default(autoincrement())
  name       String    @db.VarChar
  created_at DateTime  @default(now()) @db.Timestamp(0)
  updated_at DateTime  @default(now()) @db.Timestamp(0)
  company    company[]
}

model currency {
  ukey               Int                  @id
  name               String?              @db.VarChar(100)
  code               String?              @db.VarChar
  symbol             String?              @db.VarChar
  company            company[]
  monitored_resource monitored_resource[]
}

model hour_bi {
  ukey                  Int       @id @default(autoincrement())
  resource_name         String?   @db.VarChar
  datetime_hour         Decimal?  @db.Decimal
  shift_name            String?   @db.VarChar
  availability_goal     Decimal?  @db.Decimal
  performance_goal      Decimal?  @db.Decimal
  quality_goal          Decimal?  @db.Decimal
  energy_goal           Decimal?  @db.Decimal
  oee_goal              Decimal?  @db.Decimal
  o3e_goal              Decimal?  @db.Decimal
  availability_realized Decimal?  @db.Decimal
  energy_realized       Decimal?  @db.Decimal
  o3e_realized          Decimal?  @db.Decimal
  oee_realized          Decimal?  @db.Decimal
  performance_realized  Decimal?  @db.Decimal
  quality_realized      Decimal?  @db.Decimal
  teep_goal             Decimal?  @db.Decimal
  teep_realized         Decimal?  @db.Decimal
  utilization_goal      Decimal?  @db.Decimal
  utilization_realized  Decimal?  @db.Decimal
  week_year             Decimal?  @db.Decimal
  datetime_data         DateTime? @db.Timestamp(0)
  resource_ukey         Int?
  need_to_create        Boolean?
  need_to_update        Boolean?
  is_deleted            Boolean?
  ole_goal              Decimal?  @db.Decimal
  working_goal          Decimal?  @db.Decimal
  ole_realized          Decimal?  @db.Decimal
  working_realized      Decimal?  @db.Decimal
  resource              resource? @relation(fields: [resource_ukey], references: [ukey])
}

model maintence_bi {
  ukey           Int       @id @default(autoincrement())
  shift_name     String?   @db.VarChar
  shift_duration Decimal?  @db.Decimal
  stop_number    Decimal?  @db.Decimal
  stop_duration  Decimal?  @db.Decimal
  mttr           Decimal?  @db.Decimal
  mtbf           Decimal?  @db.Decimal
  year           Decimal?  @db.Decimal
  half           Decimal?  @db.Decimal
  quarter        Decimal?  @db.Decimal
  month          Decimal?  @db.Decimal
  week           Decimal?  @db.Decimal
  shift_start    String?   @db.VarChar
  date           DateTime? @db.Date
  status_send    Decimal?  @db.Decimal
  resource_ukey  Int?
  resource       resource? @relation(fields: [resource_ukey], references: [ukey])
}

model monitored_resource {
  ukey                  Int       @id @default(autoincrement())
  resource_ukey         Int
  calendar_ukey         String    @db.VarChar
  id_hardware_monitored String    @db.VarChar
  name_machine          String    @db.VarChar
  status                String    @db.VarChar
  standard_speed        Decimal   @db.Decimal
  standard_energy       Decimal   @db.Decimal
  standard_availability Decimal   @db.Decimal
  goal_quality          Decimal   @db.Decimal
  goal_energy           Decimal   @db.Decimal
  goal_oee              Decimal   @db.Decimal
  goal_o3e              Decimal   @db.Decimal
  time_setup            Decimal   @db.Decimal
  created_at            DateTime  @default(now()) @db.Timestamp(0)
  updated_at            DateTime  @default(now()) @db.Timestamp(0)
  hourly_cost_value     Int?
  goal_ole              Decimal   @db.Decimal
  goal_labor            Decimal   @db.Decimal
  currency              currency? @relation(fields: [hourly_cost_value], references: [ukey])
  resource              resource  @relation(fields: [resource_ukey], references: [ukey])
}

model no_work_shift {
  ukey          Int       @id
  calendar_ukey Int?
  shift_ukey    Int?
  start_at      BigInt?
  stop_at       BigInt?
  calendar      calendar? @relation(fields: [calendar_ukey], references: [ukey])
  shift         shift?    @relation(fields: [shift_ukey], references: [ukey])
}

model operations {
  ukey        Int     @id @default(autoincrement())
  code        String? @default("") @db.VarChar
  description String? @default("") @db.VarChar
}

model parameters {
  ukey       Int      @id @default(autoincrement())
  type       String   @db.VarChar
  key        String   @unique @db.VarChar
  value      String   @db.VarChar
  created_at DateTime @default(now()) @db.Timestamp(0)
  updated_at DateTime @default(now()) @db.Timestamp(0)
}

model prevent_maintence {
  ukey                    Int             @id @default(autoincrement())
  ukey_justifyreason      Int
  stop_reason_description String?         @db.VarChar
  status                  Int?
  start_at                BigInt
  stop_at                 BigInt
  resource_ukey           Int
  need_to_create          Boolean?
  need_to_update          Boolean?
  need_to_delete          Boolean?
  is_deleted              Boolean         @default(false)
  resource                resource        @relation(fields: [resource_ukey], references: [ukey])
  reason                  reason          @relation(fields: [ukey_justifyreason], references: [ukey])
  resource_stop           resource_stop[]
}

model production_order {
  ukey                        Int                           @id @default(autoincrement())
  work_center_ukey            Int
  origin                      String                        @default("") @db.Char(1)
  status_order                String                        @db.Char(1)
  product                     String                        @db.VarChar
  planned_quantity            Decimal                       @db.Decimal
  realized_quantity           Decimal?                      @db.Decimal
  open_quantity               Decimal?                      @db.Decimal
  planned_quantity_refuse     Decimal                       @db.Decimal
  real_quantity_refuse        Decimal?                      @db.Decimal
  standard_speed              Decimal?                      @db.Decimal
  standard_availability       Decimal?                      @db.Decimal
  standard_energy             Decimal?                      @db.Decimal
  goal_quality                Decimal                       @db.Decimal
  goal_energy                 Decimal                       @db.Decimal
  goal_o3e                    Decimal                       @db.Decimal
  time_setup                  Decimal                       @db.Decimal
  goal_oee                    Decimal                       @db.Decimal
  planned_start               BigInt
  real_start                  BigInt?
  planned_end                 BigInt
  real_end                    BigInt?
  last_annotation             BigInt?
  type_refuse                 Int?
  resource_ukey               Int?
  need_to_create              Boolean?
  need_to_update              Boolean?
  is_deleted                  Boolean?
  need_to_delete              Boolean?
  created_at                  DateTime?                     @default(now()) @db.Timestamp(0)
  updated_at                  DateTime?                     @default(now()) @db.Timestamp(0)
  goal_speed                  Decimal                       @db.Decimal
  goal_availability           Decimal                       @db.Decimal
  code                        String                        @default("") @db.VarChar
  unity_quantity_ukey         Int?
  unity_refuse_ukey           Int?
  operation_ukey              Int?
  goal_performance            Decimal?                      @db.Decimal
  refuse_conversion           String?                       @db.VarChar
  nonconforming_quantity      Decimal?                      @db.Decimal
  column14                    String?                       @db.VarChar(1)
  datetime_planned_end        DateTime                      @db.Timestamp(6)
  datetime_planned_start      DateTime                      @db.Timestamp(6)
  goal_ole                    Decimal?                      @db.Decimal
  goal_working                Decimal?                      @db.Decimal
  resource                    resource?                     @relation(fields: [resource_ukey], references: [ukey])
  work_center                 work_center                   @relation(fields: [work_center_ukey], references: [ukey])
  production_order_annotation production_order_annotation[]

  @@unique([resource_ukey, operation_ukey, code], name: "codeOperationResource")
}

model production_order_annotation {
  ukey                    Int              @id @default(autoincrement())
  ukey_production_order   Int
  ukey_resource           Int
  ukey_shift              Int?
  quantity                Decimal          @db.Decimal
  quantity_refuse         Decimal          @db.Decimal
  origin                  String?          @db.Char(1)
  status_annotation       Int
  created_at              BigInt?
  need_to_create_on_cloud Boolean          @default(true)
  production_order        production_order @relation(fields: [ukey_production_order], references: [ukey])
  resource                resource         @relation(fields: [ukey_resource], references: [ukey])
  shift                   shift?           @relation(fields: [ukey_shift], references: [ukey])
}

model reason {
  ukey              Int                 @id @default(autoincrement())
  reason            String              @db.VarChar
  is_produtive      Boolean
  is_utilization    Boolean
  is_preventive     Boolean             @default(false)
  is_deleted        Boolean             @default(false)
  login_deleted     String              @db.VarChar
  is_simulation     Boolean             @default(false)
  type_reason       String?             @db.VarChar
  prevent_maintence prevent_maintence[]
  resource_stop     resource_stop[]
}

model resource {
  ukey                        Int                           @id @default(autoincrement())
  resource_type_ukey          Int
  calendar_ukey               Int
  name                        String                        @db.VarChar
  created_at                  DateTime                      @default(now()) @db.Timestamp(0)
  updated_at                  DateTime                      @default(now()) @db.Timestamp(0)
  hourly_cost_value           Int?
  status                      String?                       @db.VarChar
  logical_id_monitored        String?                       @db.VarChar
  id_monitor                  Int?
  calendar                    calendar                      @relation(fields: [calendar_ukey], references: [ukey])
  resource_type               resource_type                 @relation(fields: [resource_type_ukey], references: [ukey])
  hour_bi                     hour_bi[]
  maintence_bi                maintence_bi[]
  monitored_resource          monitored_resource[]
  prevent_maintence           prevent_maintence[]
  production_order            production_order[]
  production_order_annotation production_order_annotation[]
  resource_stop               resource_stop[]
  shift_bi                    shift_bi[]
  work_center                 work_center[]
}

model resource_stop {
  ukey                Int                @id @default(autoincrement())
  ukey_prevent        Int?
  justify_reason_ukey Int?
  produtive_analized  Boolean
  shift               String    @db.VarChar
  current_date        String?   @db.VarChar
  created_at          DateTime  @db.Date
  login_update_cloud  String?   @db.VarChar
  resource_ukey       Int?
  start_at            BigInt
  stop_at             BigInt
  status_create       Int?
  need_to_create      Boolean?  @default(false)
  need_to_update      Boolean?  @default(false)
  reason              reason?   @relation(fields: [justify_reason_ukey], references: [ukey])
  resource            resource? @relation(fields: [resource_ukey], references: [ukey])
  updated_at          DateTime  @default(now()) @updatedAt @db.Timestamp(0)
  updated_by          String    @default("SISTEMA")
  prevent_maintence   prevent_maintence? @relation(fields: [ukey_prevent], references: [ukey])
}

model resource_type {
  ukey       Int        @id @default(autoincrement())
  name       String     @db.VarChar
  created_at DateTime   @default(now()) @db.Timestamp(0)
  updated_at DateTime   @default(now()) @db.Timestamp(0)
  resource   resource[]
}

model sector {
  ukey         Int           @id @default(autoincrement())
  code         String        @db.VarChar
  name         String        @db.VarChar
  created_at   DateTime      @default(now()) @db.Timestamp(0)
  updated_at   DateTime      @default(now()) @db.Timestamp(0)
  ukey_company Int?
  company      company?      @relation(fields: [ukey_company], references: [ukey])
  work_center  work_center[]
}

model shift {
  ukey                        Int                           @id @default(autoincrement())
  shift_name                  String                        @db.VarChar
  created_at                  DateTime                      @default(now()) @db.Timestamp(0)
  updated_at                  DateTime                      @default(now()) @db.Timestamp(0)
  no_work_shift               no_work_shift[]
  production_order_annotation production_order_annotation[]
  work_shift                  work_shift[]
}

model shift_bi {
  ukey                  Int       @id @default(autoincrement())
  resource_name         String?   @db.VarChar
  datetime_hour         Int?
  shift_name            String?   @db.VarChar
  availability_goal     Decimal?  @db.Decimal
  performance_goal      Decimal?  @db.Decimal
  quality_goal          Decimal?  @db.Decimal
  energy_goal           Decimal?  @db.Decimal
  oee_goal              Decimal?  @db.Decimal
  o3e_goal              Decimal?  @db.Decimal
  availability_realized Decimal?  @db.Decimal
  energy_realized       Decimal?  @db.Decimal
  oee_realized          Decimal?  @db.Decimal
  performance_realized  Decimal?  @db.Decimal
  quality_realized      Decimal?  @db.Decimal
  teep_goal             Decimal?  @db.Decimal
  teep_realized         Decimal?  @db.Decimal
  utilization_goal      Decimal?  @db.Decimal
  utilization_realized  Decimal?  @db.Decimal
  week_year             Int?
  datetime_data         DateTime? @db.Timestamp(0)
  ukey_edge             String?   @db.VarChar
  o3e_realized          Decimal?  @db.Decimal
  resource_ukey         Int?
  need_to_create        Boolean?
  need_to_update        Boolean?
  is_deleted            Boolean?
  ole_goal              Decimal?  @db.Decimal
  working_goal          Decimal?  @db.Decimal
  ole_realized          Decimal?  @db.Decimal
  working_realized      Decimal?  @db.Decimal
  resource              resource? @relation(fields: [resource_ukey], references: [ukey])
}

model units {
  ukey        Int     @id @default(autoincrement())
  initials    String? @default("") @db.VarChar
  description String? @default("") @db.VarChar
}

model users {
  ukey         Int      @id @default(autoincrement())
  name         String   @db.VarChar
  email        String   @db.VarChar
  login        String   @db.VarChar
  password     String   @db.VarChar
  created_at   DateTime @default(now()) @db.Timestamp(0)
  updated_at   DateTime @default(now()) @db.Timestamp(0)
  company_ukey Int
  company      company  @relation(fields: [company_ukey], references: [ukey])
}

model work_center {
  ukey             Int                @id @default(autoincrement())
  sector_ukey      Int
  name             String             @db.VarChar
  resource_ukey    Int
  calendar_ukey    Int?
  resource         resource           @relation(fields: [resource_ukey], references: [ukey])
  sector           sector             @relation(fields: [sector_ukey], references: [ukey])
  production_order production_order[]
}

model work_shift {
  ukey          Int       @id
  calendar_ukey Int?
  shift_ukey    Int?
  total         Int?
  day_week      Int?
  start         Int?
  end           Int?
  calendar      calendar? @relation(fields: [calendar_ukey], references: [ukey])
  shift         shift?    @relation(fields: [shift_ukey], references: [ukey])
}
`

exports.schema = schema;
