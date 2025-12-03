import { render, screen } from "@testing-library/react";
import UserTable from "../../src/components/UserTable";
import { User } from "../../src/entities";

describe("UserTable", () => {
  it("should render no users message when users array is empty", () => {
    render(<UserTable users={[]} />);

    expect(screen.getByText(/no users available/i)).toBeInTheDocument();
  });

  it("should render table headers", () => {
    const users: User[] = [{ id: 1, name: "Anjali" }];
    render(<UserTable users={users} />);

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("should render user data in table rows", () => {
    const users: User[] = [
      { id: 1, name: "Anjali" },
      { id: 2, name: "John" },
    ];
    render(<UserTable users={users} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Anjali")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
  });

  it("should render edit links for each user", () => {
    const users: User[] = [
      { id: 1, name: "Anjali" },
      { id: 2, name: "John" },
    ];
    render(<UserTable users={users} />);

    const editLinks = screen.getAllByText("Edit");
    expect(editLinks).toHaveLength(2);
    expect(editLinks[0]).toHaveAttribute("href", "/users/1");
    expect(editLinks[1]).toHaveAttribute("href", "/users/2");
  });

  it("should render correct number of rows for users", () => {
    const users: User[] = [
      { id: 1, name: "Anjali" },
      { id: 2, name: "John" },
      { id: 3, name: "Jane" },
    ];
    render(<UserTable users={users} />);

    const rows = screen.getAllByRole("row");
    // 1 header row + 3 data rows
    expect(rows).toHaveLength(4);
  });
});
