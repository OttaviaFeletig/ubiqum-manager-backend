interface PageI {
  title: string;
  content: string;
  conflPageId: string;
  conflChildrenId: Array<string>;
  program: string;
}
type Pages = Array<PageI>;
