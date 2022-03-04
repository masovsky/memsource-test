package memsource.filter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Component;

@Component
public class UrlRewriteFilter implements Filter {

    private static final String INDEX_URI = "/index.html";

    private List<AntPathRequestMatcher> rewritePaths = new ArrayList<>();

    @Override
    public void init(FilterConfig filterConfig) {
        rewritePaths = Stream.of("/settings", "/projects")
                .map(AntPathRequestMatcher::new)
                .collect(Collectors.toList());
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        if (request instanceof HttpServletRequest && isToForwardPath((HttpServletRequest) request)) {
            request.getRequestDispatcher(INDEX_URI).forward(request, response);
        } else {
            chain.doFilter(request, response);
        }
    }

    private boolean isToForwardPath(HttpServletRequest request) {
        return rewritePaths.stream().anyMatch(antPathRequestMatcher -> antPathRequestMatcher.matches(request));
    }

    @Override
    public void destroy() {
        // nothing to destroy
    }
}
