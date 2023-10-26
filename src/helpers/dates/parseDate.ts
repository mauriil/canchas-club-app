export const parseDate = (date: string) => {
    const fecha: Date = new Date(date);
    if (isNaN(fecha.getTime())) return '';
    fecha.setDate(fecha.getDate() + 1);
    const daysOfWeek: string[] = [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado',
    ];
    const months: string[] = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
    ];
    const nombreDia: string = daysOfWeek[fecha.getDay()].charAt(0).toUpperCase() + daysOfWeek[fecha.getDay()].slice(1);
    const diaMes: number = fecha.getDate();
    const nombreMes: string = months[fecha.getMonth()].charAt(0).toUpperCase() + months[fecha.getMonth()].slice(1);

    return `${nombreDia} ${diaMes} de ${nombreMes}`;
};
