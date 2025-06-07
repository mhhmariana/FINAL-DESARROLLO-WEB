# FINAL-DESARROLLO-WEB

## 📋 Información del Proyecto

**Materia:** Arquitectura de Software
**Tipo:** Entrega Final  
**Institución:** Unilasallista Corporación Universitaria  
**Período Académico:** Séptimo Semestre

## 👥 Integrantes del Equipo

- **Mariana Hincapié Henao** - 1017923583
- **Nicolas Felipe Uribe Medez** - 1003534021

## 🎯 Objetivo del Proyecto

Este proyecto implementa un **sistema de validación de seguros vehiculares** basado en el historial de accidentes, utilizando una **arquitectura de microservicios** con tecnologías .NET y bases de datos SQL Server.

### Funcionalidades Principales:
- **Consulta de Accidentes:** Obtención del historial de accidentes por placa vehicular
- **Validación de Seguros:** Evaluación automática basada en la severidad de accidentes
- **Almacenamiento de Validaciones:** Registro de todas las validaciones realizadas
- **API REST:** Endpoints para integración con sistemas externos

## 🏗️ Arquitectura del Sistema

### Microservicio 1: Consulta de Accidentes
- **Propósito:** Proporcionar información detallada sobre accidentes vehiculares
- **Respuesta:** Datos de accidente (ID, Placa, Severidad, Fecha)

### Microservicio 2: Validación de Seguros
- **Propósito:** Evaluar solicitudes de seguro y almacenar resultados
- **Funcionalidades:**
  - Consulta al microservicio de accidentes
  - Almacenamiento en base de datos

## 📊 Lógica de Negocio

### Sistema de Puntuación por Severidad:
- **Solo Latas:** 100 puntos
- **Heridos:** 200 puntos  
- **Muertos:** 300 puntos

### Criterios de Aprobación:
- **≥ 300 puntos:** "Rechazada - Historial grave de accidentes"
- **< 300 puntos:** "Aprobada - Historial aceptable"
- **Sin historial:** "Aprobada - Sin historial de accidentes"

---

**Fecha de Entrega:** Junio 6 del 2025  
**Profesor:** Nestor Velez Vargas  
**Materia:** Desarrollo Web
