import Ball from "./Ball";

export default function BallLine({
    items, color, disabled = false, onClick
}: {
    items: Array<number | string>,
    color: (ix: number, el:number | string) => {bgColor: string, txColor: string},
    disabled?: boolean,
    onClick?: (ix: number) => void
}
) {
    return (
        <span>
            {items.map((val, ix) => (<Ball 
                                        key={ix}
                                        value={val + ''}
                                        clickable={!!onClick}
                                        onClick={!!onClick ? () => onClick(ix) : undefined}
                                        disabled={disabled}
                                        {...color(ix, val)}
                                        />)
                      )
            }
        </span>
    );
}