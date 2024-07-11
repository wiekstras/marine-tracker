import {Variants} from "framer-motion";

export const staggerContainer = ( duration: number): Variants => {
    return{
        initial: {},
        animate: {
            transition:{
                staggerChildren: duration,
            },
        }
    }
}

export const fadeIn = (direction: "up" | "down"  = "up"): Variants => {
    return{
        initial: {
            y: direction === "up" ?40 :-60,
            opacity: 0,
        },
        animate: {
            y: 0,
            opacity: 1,

            transition:{
                duration: 0.4,
                ease: "easeInOut",
            },
        }
    }
};

export const fadeInHorizontal = (direction: "left" | "right"  = "left"): Variants => {
    return{
        initial: {
            x: direction === "left" ?40 :-60,
            opacity: 0,
        },
        animate: {
            x: 0,
            opacity: 1,

            transition:{
                duration: 0.4,
                ease: "easeInOut",
            },
        }
    }
};

export const opacity = (direction: "in" | "out"  = "in"): Variants => {
    return{
        initial: {
            y: 0,
            opacity: direction === "in" ?0 :1,
        },
        animate: {
            y: 0,
            opacity: direction === "out" ?0 :1,

            transition:{
                duration: 0.5,
                ease: "easeInOut",
            },
        }
    }
};