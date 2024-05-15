const transitions = {
    container: {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    },
    item: {
        hidden: { y: 20, opacity: 0, scale: 0 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3
            }
        }
    }
}
export default transitions;