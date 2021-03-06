package memsource.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "setting")
public class Setting {

    public static final long SETTING_ID = 0;

    @Id
    @JsonIgnore
    @Column(name = "id")
    private final Long id = SETTING_ID;

    @NotBlank(message = "name.empty")
    @Size(message = "name.max", max = 128)
    @Column(name = "name", nullable = false, length = 128)
    private String name = "";

    @NotBlank(message = "password.empty")
    @Size(message = "password.max", max = 256)
    @Column(name = "password", nullable = false, length = 256)
    private String password = "";

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        Setting other = (Setting) obj;
        return Objects.equals(id, other.getId());
    }
}
