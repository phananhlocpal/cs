import { FilterComponent, ListComponent } from "./components";

export const RequestListPage = () => {
    return (
        <div>
            <h1>Request List</h1>
            <FilterComponent />
            <ListComponent />
        </div>
    );
}