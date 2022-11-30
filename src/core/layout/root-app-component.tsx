interface Props {
    children: React.ReactNode;
}
export default function RootAppComponent(props: Props) {
    return props.children as React.ReactElement;
}
