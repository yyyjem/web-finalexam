import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;
import java.util.stream.Collectors;

// 新闻文章实体类（记录类型 - Java 16+）
record Article(String title, String content, List<String> keywords) {}

public class NewsAnalysisDemo {
    public static void main(String[] args) {
        try {
            // 从文件读取新闻数据
            List<Article> articles = loadArticles("news_data.txt");
            
            // 执行关键词分析
            Map<String, Long> keywordStats = analyzeKeywords(articles);
            
            // 输出统计结果
            printStatistics(keywordStats);
            
        } catch (IOException e) {
            System.err.println("文件读取错误: " + e.getMessage());
        }
    }

    // 文件加载方法
    private static List<Article> loadArticles(String filename) throws IOException {
        return Files.lines(Path.of(filename))
                .map(line -> {
                    String[] parts = line.split("\\|");
                    return new Article(
                        parts[0], 
                        parts[1],
                        Arrays.asList(parts[2].split(","))
                    );
                })
                .collect(Collectors.toList());
    }

    // 关键词统计方法
    private static Map<String, Long> analyzeKeywords(List<Article> articles) {
        return articles.stream()
                .flatMap(article -> article.keywords().stream())
                .collect(Collectors.groupingBy(
                    keyword -> keyword,
                    Collectors.counting()
                ));
    }

    // 结果输出方法
    private static void printStatistics(Map<String, Long> stats) {
        System.out.println("\n=== 关键词统计结果 ===");
        stats.entrySet().stream()
            .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
            .forEach(entry -> 
                System.out.printf("%-15s: %d 次%n", entry.getKey(), entry.getValue())
            );
    }
}