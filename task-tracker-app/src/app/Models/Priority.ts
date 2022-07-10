export const Priority = {
    High: {
        id: 2,
        label: "High",
        color: "rgb(242, 59, 81)"
    },
    Medium: {
        id: 1,
        label: "Medium",
        color: "rgb(242, 145, 59)"
    },
    Low: {
        id: 0,
        label: "Low",
        color: "rgb(59, 179, 242)"
    }
}
export var priorityList = Object.entries(Priority).map((entry) => {
    return {
        id: entry[1].id,
        label: entry[1].label,
        color: entry[1].color
    }
});