import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, JSX } from "react";

export default class miscUtils {
    static jsonToTableData(vJson: any) {
        var pOut = {
            head: vJson.ColumnsArray,
            body: vJson.Rows.map((vRow: any) =>
                vJson.ColumnsArray.map((vCol: string) => vRow[vCol])
            )
        };
        return pOut;
    }

    static getErrorMessage(error: unknown): string {
        return error instanceof Error ? error.message : String(error);
    }

    static errorToList(error: any) {
        if (error?.errors == null)
            return null;
        var pOut: ReactNode[] = [];
        Object.entries(error.errors).forEach(([key, value]) => {
            pOut.push(<li key={key}>{value as ReactNode}</li>);
        });
        return <ul>{pOut}</ul>;
    }

    static errorToListOrMessage(error: unknown): React.ReactNode | string {
        var pOut = this.errorToList(error);
        if (pOut != null)
            return pOut;
        var pOut2 = this.getErrorMessage(error);
        return pOut2;
    }
}