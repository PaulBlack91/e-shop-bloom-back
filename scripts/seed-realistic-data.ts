import { DataSource } from 'typeorm';
import { UserEntity } from '../src/modules/user/infrastructure/persistence/entities/user.entity';
import { CourseEntity } from '../src/modules/course/infrastructure/persistence/entities/course.entity';
import { ContentEntity } from '../src/modules/course/infrastructure/persistence/entities/content.entity';
import { OrderEntity } from '../src/modules/course/infrastructure/persistence/entities/order.entity';
import { UserCourseEntity } from '../src/modules/course/infrastructure/persistence/entities/user-course.entity';
import { UserRole, AuthProvider } from '../src/modules/user/domain/user.domain';
import { CourseStatus } from '../src/modules/course/infrastructure/persistence/entities/course.entity';
import { ContentType } from '../src/modules/course/infrastructure/persistence/entities/content.entity';
import {
  OrderStatus,
  PaymentGateway,
} from '../src/modules/course/infrastructure/persistence/entities/order.entity';

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '12345',
  database: 'eshopbloom',
  entities: [
    UserEntity,
    CourseEntity,
    ContentEntity,
    OrderEntity,
    UserCourseEntity,
  ],
  synchronize: true,
  dropSchema: true, // Esto recreará toda la base de datos
});

async function seedData() {
  await dataSource.initialize();

  console.log('🌱 Iniciando seed de datos realistas...');
  console.log('🗑️ Base de datos recreada desde cero...');

  // === USUARIOS REALISTAS ===
  const users = [
    {
      id: 'user-maria-gonzalez',
      name: 'María González',
      email: 'maria.gonzalez@gmail.com',
      provider: AuthProvider.LOCAL,
      role: UserRole.USER,
      isEmailVerified: true,
    },
    {
      id: 'user-ana-rodriguez',
      name: 'Ana Rodríguez',
      email: 'ana.rodriguez@hotmail.com',
      provider: AuthProvider.GOOGLE,
      role: UserRole.USER,
      isEmailVerified: true,
    },
    {
      id: 'user-lucia-martinez',
      name: 'Lucía Martínez',
      email: 'lucia.emprendedora@yahoo.com',
      provider: AuthProvider.LOCAL,
      role: UserRole.USER,
      isEmailVerified: true,
    },
    {
      id: 'user-carmen-lopez',
      name: 'Carmen López',
      email: 'carmen.cosmetica@gmail.com',
      provider: AuthProvider.LOCAL,
      role: UserRole.USER,
      isEmailVerified: true,
    },
    {
      id: 'user-sofia-hernandez',
      name: 'Sofía Hernández',
      email: 'sofia.wellness@outlook.com',
      provider: AuthProvider.GOOGLE,
      role: UserRole.USER,
      isEmailVerified: true,
    },
    {
      id: 'user-valeria-nuevas',
      name: 'Valeria Nuevas',
      email: 'valeria.nuevas@gmail.com',
      provider: AuthProvider.LOCAL,
      role: UserRole.USER,
      isEmailVerified: false,
    },
  ];

  console.log('👥 Creando usuarios...');
  const savedUsers = await dataSource.getRepository(UserEntity).save(users);

  // === CURSOS REALISTAS (basados en tu frontend) ===
  const courses = [
    {
      id: 'course-produccion-cosmetica',
      title: 'Producción Cosmética Rentable',
      description:
        'Aprende a crear productos cosméticos rentables y sostenibles para tu negocio. Desde formulaciones básicas hasta estrategias de comercialización.',
      shortDescription: 'Crea cosméticos rentables desde casa',
      price: 149.99,
      currency: 'USD',
      originalPrice: 199.99,
      status: CourseStatus.PUBLISHED,
      thumbnailUrl: '/images/curso-cosmetica-rentable.jpg',
      totalDuration: 480, // 8 horas
      totalContent: 32,
      whatYouWillLearn:
        'Formulación de productos • Costos y precios • Marketing cosmético • Normativas legales • Producción en escala',
    },
    {
      id: 'course-ritual-bienestar',
      title: 'Ritual y Bienestar',
      description:
        'Crea velas y jabones artesanales para el cuidado personal y bienestar. Técnicas ancestrales combinadas con conocimiento moderno.',
      shortDescription: 'Velas y jabones artesanales terapéuticos',
      price: 79.99,
      currency: 'USD',
      originalPrice: 119.99,
      status: CourseStatus.PUBLISHED,
      thumbnailUrl: '/images/curso-ritual-bienestar.jpg',
      totalDuration: 240, // 4 horas
      totalContent: 16,
      whatYouWillLearn:
        'Elaboración de velas • Jabones naturales • Aceites esenciales • Rituales de bienestar • Aromaterapia básica',
    },
    {
      id: 'course-cosmetica-sanar',
      title: 'Cosmética para Sanar',
      description:
        'Técnicas de cosmética natural terapéutica para el cuidado y sanación de la piel. Ingredientes medicinales y preparaciones curativas.',
      shortDescription: 'Cosmética terapéutica y medicinal',
      price: 119.99,
      currency: 'USD',
      originalPrice: 159.99,
      status: CourseStatus.PUBLISHED,
      thumbnailUrl: '/images/curso-cosmetica-sanar.jpg',
      totalDuration: 360, // 6 horas
      totalContent: 24,
      whatYouWillLearn:
        'Plantas medicinales • Extractos naturales • Tratamientos específicos • Dermatología natural • Formulaciones curativas',
    },
  ];

  console.log('📚 Creando cursos...');
  const savedCourses = await dataSource
    .getRepository(CourseEntity)
    .save(courses);

  // === CONTENIDO REALISTA ===
  const content = [
    // Curso 1: Producción Cosmética
    {
      courseId: savedCourses[0].id,
      title: 'Introducción a la cosmética rentable',
      type: ContentType.VIDEO,
      fileUrl: '/uploads/course1/intro.mp4',
      fileName: 'intro.mp4',
      fileSize: 52428800,
      duration: 900,
      order: 1,
    },
    {
      courseId: savedCourses[0].id,
      title: 'Manual de ingredientes básicos',
      type: ContentType.PDF,
      fileUrl: '/uploads/course1/ingredientes.pdf',
      fileName: 'ingredientes.pdf',
      fileSize: 2048000,
      order: 2,
    },
    {
      courseId: savedCourses[0].id,
      title: 'Formulación de cremas hidratantes',
      type: ContentType.VIDEO,
      fileUrl: '/uploads/course1/cremas.mp4',
      fileName: 'cremas.mp4',
      fileSize: 67108864,
      duration: 1200,
      order: 3,
    },
    {
      courseId: savedCourses[0].id,
      title: 'Cálculo de costos y precios',
      type: ContentType.VIDEO,
      fileUrl: '/uploads/course1/costos.mp4',
      fileName: 'costos.mp4',
      fileSize: 45678901,
      duration: 800,
      order: 4,
    },

    // Curso 2: Ritual y Bienestar
    {
      courseId: savedCourses[1].id,
      title: 'Fundamentos de aromaterapia',
      type: ContentType.VIDEO,
      fileUrl: '/uploads/course2/aromaterapia.mp4',
      fileName: 'aromaterapia.mp4',
      fileSize: 41943040,
      duration: 720,
      order: 1,
    },
    {
      courseId: savedCourses[1].id,
      title: 'Recetas de velas aromáticas',
      type: ContentType.PDF,
      fileUrl: '/uploads/course2/velas-recetas.pdf',
      fileName: 'velas-recetas.pdf',
      fileSize: 1536000,
      order: 2,
    },
    {
      courseId: savedCourses[1].id,
      title: 'Elaboración paso a paso de jabones',
      type: ContentType.VIDEO,
      fileUrl: '/uploads/course2/jabones.mp4',
      fileName: 'jabones.mp4',
      fileSize: 73728000,
      duration: 1100,
      order: 3,
    },

    // Curso 3: Cosmética para Sanar
    {
      courseId: savedCourses[2].id,
      title: 'Plantas medicinales en cosmética',
      type: ContentType.VIDEO,
      fileUrl: '/uploads/course3/plantas.mp4',
      fileName: 'plantas.mp4',
      fileSize: 58720256,
      duration: 950,
      order: 1,
    },
    {
      courseId: savedCourses[2].id,
      title: 'Guía de extractos curativos',
      type: ContentType.PDF,
      fileUrl: '/uploads/course3/extractos.pdf',
      fileName: 'extractos.pdf',
      fileSize: 3072000,
      order: 2,
    },
    {
      courseId: savedCourses[2].id,
      title: 'Tratamientos para piel sensible',
      type: ContentType.VIDEO,
      fileUrl: '/uploads/course3/piel-sensible.mp4',
      fileName: 'piel-sensible.mp4',
      fileSize: 62914560,
      duration: 1080,
      order: 3,
    },
  ];

  console.log('🎥 Creando contenido...');
  await dataSource.getRepository(ContentEntity).save(content);

  // === ÓRDENES Y COMPRAS REALISTAS ===
  const orders = [
    // María González - Compró solo curso 1 (Producción Cosmética)
    {
      id: 'order-maria-001',
      userId: savedUsers[0].id,
      courseId: savedCourses[0].id,
      amount: 149.99,
      currency: 'USD',
      status: OrderStatus.PAID,
      preferredGateway: PaymentGateway.STRIPE,
      paidAt: new Date('2024-12-15'),
    },

    // Ana Rodríguez - Compró curso 1 y 2
    {
      id: 'order-ana-001',
      userId: savedUsers[1].id,
      courseId: savedCourses[0].id,
      amount: 149.99,
      currency: 'USD',
      status: OrderStatus.PAID,
      preferredGateway: PaymentGateway.MERCADOPAGO,
      paidAt: new Date('2024-12-10'),
    },
    {
      id: 'order-ana-002',
      userId: savedUsers[1].id,
      courseId: savedCourses[1].id,
      amount: 79.99,
      currency: 'USD',
      status: OrderStatus.PAID,
      preferredGateway: PaymentGateway.MERCADOPAGO,
      paidAt: new Date('2024-12-20'),
    },

    // Lucía Martínez - Compró los 3 cursos (bundle)
    {
      id: 'order-lucia-bundle',
      userId: savedUsers[2].id,
      courseId: savedCourses[0].id,
      amount: 244.97,
      currency: 'USD',
      status: OrderStatus.PAID,
      preferredGateway: PaymentGateway.STRIPE,
      paidAt: new Date('2024-12-01'),
    }, // Bundle con descuento

    // Carmen López - Compró solo curso 3
    {
      id: 'order-carmen-001',
      userId: savedUsers[3].id,
      courseId: savedCourses[2].id,
      amount: 119.99,
      currency: 'USD',
      status: OrderStatus.PAID,
      preferredGateway: PaymentGateway.STRIPE,
      paidAt: new Date('2024-12-22'),
    },

    // Sofía - Una orden pendiente (no pagada)
    {
      id: 'order-sofia-pending',
      userId: savedUsers[4].id,
      courseId: savedCourses[1].id,
      amount: 79.99,
      currency: 'USD',
      status: OrderStatus.PENDING,
      preferredGateway: PaymentGateway.MERCADOPAGO,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000),
    },
  ];

  console.log('🛒 Creando órdenes...');
  await dataSource.getRepository(OrderEntity).save(orders);

  // === ACCESOS A CURSOS ===
  const userCourses = [
    // María González - Solo curso 1
    {
      userId: savedUsers[0].id,
      courseId: savedCourses[0].id,
      orderId: 'order-maria-001',
      hasAccess: true,
      accessCount: 15,
      lastAccessedAt: new Date('2025-01-05'),
    },

    // Ana Rodríguez - Curso 1 y 2
    {
      userId: savedUsers[1].id,
      courseId: savedCourses[0].id,
      orderId: 'order-ana-001',
      hasAccess: true,
      accessCount: 8,
      lastAccessedAt: new Date('2025-01-02'),
    },
    {
      userId: savedUsers[1].id,
      courseId: savedCourses[1].id,
      orderId: 'order-ana-002',
      hasAccess: true,
      accessCount: 12,
      lastAccessedAt: new Date('2025-01-07'),
    },

    // Lucía Martínez - Los 3 cursos (bundle)
    {
      userId: savedUsers[2].id,
      courseId: savedCourses[0].id,
      orderId: 'order-lucia-bundle',
      hasAccess: true,
      accessCount: 22,
      lastAccessedAt: new Date('2025-01-06'),
    },
    {
      userId: savedUsers[2].id,
      courseId: savedCourses[1].id,
      orderId: 'order-lucia-bundle',
      hasAccess: true,
      accessCount: 18,
      lastAccessedAt: new Date('2025-01-04'),
    },
    {
      userId: savedUsers[2].id,
      courseId: savedCourses[2].id,
      orderId: 'order-lucia-bundle',
      hasAccess: true,
      accessCount: 25,
      lastAccessedAt: new Date('2025-01-08'),
    },

    // Carmen López - Solo curso 3
    {
      userId: savedUsers[3].id,
      courseId: savedCourses[2].id,
      orderId: 'order-carmen-001',
      hasAccess: true,
      accessCount: 5,
      lastAccessedAt: new Date('2025-01-03'),
    },

    // Sofía y Valeria - Sin cursos comprados (no aparecen en user_course)
  ];

  console.log('🎓 Creando accesos a cursos...');
  await dataSource.getRepository(UserCourseEntity).save(userCourses);

  console.log('✅ Seed completado exitosamente!');
  console.log('\n📊 Resumen de datos creados:');
  console.log(`👥 Usuarios: ${users.length}`);
  console.log(`📚 Cursos: ${courses.length}`);
  console.log(`🎥 Contenidos: ${content.length}`);
  console.log(`🛒 Órdenes: ${orders.length}`);
  console.log(`🎓 Accesos: ${userCourses.length}`);

  console.log('\n🧪 Casos de prueba:');
  console.log(`• María González (${savedUsers[0].id}): Solo curso 1`);
  console.log(`• Ana Rodríguez (${savedUsers[1].id}): Curso 1 y 2`);
  console.log(
    `• Lucía Martínez (${savedUsers[2].id}): Los 3 cursos (hasAllCourses: true)`,
  );
  console.log(`• Carmen López (${savedUsers[3].id}): Solo curso 3`);
  console.log(
    `• Sofía Hernández (${savedUsers[4].id}): Sin cursos (orden pendiente)`,
  );
  console.log(`• Valeria Nuevas (${savedUsers[5].id}): Sin cursos comprados`);

  await dataSource.destroy();
}

seedData().catch((error) => {
  console.error('❌ Error en seed:', error);
  process.exit(1);
});
