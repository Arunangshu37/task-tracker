export const Priority = {
    High: {
        id: 2,
        label: "High",
        color: "rgb(177, 45, 45)"
    },
    Medium: {
        id: 1,
        label: "Medium",
        color: "rgb(253, 232, 116)"
    },
    Low: {
        id: 0,
        label: "Low",
        color: "rgb(167, 231, 255)"
    }
}
export var priorityList = Object.entries(Priority).map((entry) => {
    return {
        id: entry[1].id,
        label: entry[1].label,
        color: entry[1].color
    }
});