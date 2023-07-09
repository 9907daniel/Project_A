package portfolio.backend.authentication.oauth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import portfolio.backend.authentication.api.entity.user.User;
import portfolio.backend.authentication.api.repository.user.UserRepository;
import portfolio.backend.authentication.oauth.entity.UserPrincipal;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserId(username);
        if (user == null) {
            throw new UsernameNotFoundException("username을 찾을 수 없습니다.");
        }
        return UserPrincipal.create(user);
    }
}
