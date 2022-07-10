export const Status = {
    New: {
        id: 0,
        label: "New",
        color: "rgb(63, 104, 255)"
    },
    OnGoing: {
        id: 1,
        label: "On going",
        color: "rgb(233, 153, 40)"
    },
    OnHold: {
        id: 3,
        label: "Hold",
        color: "rgb(140, 140, 140)"
    },
    Complete: {
        id: 2,
        label: "Complete",
        color: "rgb(93, 170, 45)"
    },
}
export var statusList = Object.entries(Status).map((entry) => {
    return {
        id: entry[1].id,
        label: entry[1].label,
        color: entry[1].color
    }
});