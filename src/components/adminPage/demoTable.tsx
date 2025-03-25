import { Input } from "../ui/input"

interface Props {
    value: number[]
    name: string
    onChange: (value: number[]) => void
    onBlur?: () => void
    disabled?: boolean
  }

  const articles = [
    {
      id: 1,
      title: 'Intro',
      publishedAt: '2024-04-01',
      tags: ['meta'],
    },
    {
      id: 2,
      title: 'License',
      publishedAt: '2024-04-01',
      tags: ['meta'],
    },
    {
      id: 3,
      title: 'The security implications of packages in front-end apps',
      publishedAt: '2024-04-15',
      tags: ['security', 'packages', 'npm', 'frontend'],
    },
  ]
  
  const ArticleSelect = ({ value, name, onChange, onBlur, disabled }: Props) => (
    <table>
      <thead>
        <tr>
          <th>
            <Input
              type="checkbox"
              checked={value.length === articles.length}
              onClick={() =>
                onChange(
                  value.length === articles.length
                    // Uncheck all
                    ? []
                    // Check all
                    : articles.map((article) => article.id),
                )
              }
            />
          </th>
          <th>Title</th>
          <th>Published</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        {articles.map((article) => {
          const checked = value.includes(article.id)
          const toggle = () =>
            onChange(
              checked
                // Already in value: Remove from value
                ? value.filter((id) => id !== article.id)
                // Not yet in value: Add to value
                : [...value, article.id],
            )
  
          return (
            <tr key={article.id}>
              <td>
                <Input
                  type="checkbox"
                  name={name}
                  checked={checked}
                  onChange={toggle}
                  onBlur={onBlur}
                  disabled={disabled}
                />
              </td>
              <td>{article.title}</td>
              <td>{article.publishedAt}</td>
              <td>{article.tags.join(', ')}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
  
  export default ArticleSelect