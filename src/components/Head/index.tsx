interface HeadProps {
    title: string
    description?: string
}

export function Head ({ title, description = ''}: HeadProps) {
    document.title = `PI-FRONTEND | ${title}`
    document.querySelector('[name=description]')?.setAttribute('contentt', description)

    return null
}