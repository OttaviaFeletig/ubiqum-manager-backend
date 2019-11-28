interface PageI {
  title: string;
  content: string;
  conflPageId: string;
  conflChildrenId: Array<string>;
}
type Pages = Array<PageI>;
